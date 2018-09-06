const { TEAM_ID, EFFECT_TYPE, BATTLE_RESULT } = require('./constant')
const { getDamage, getSpeed } = require('../common/formula')
const EventCharacterAction = require('./events/eventCharacterAction')
const Queue = require('./queue')
const config = require('./config')

const battle = {};

const willStart = (state) => {
	console.log('will start')

	state.playerTeam.characters.forEach(character => initialCharacterStatus(character, TEAM_ID.PLAYER))
	state.enemyTeam.characters.forEach(character => initialCharacterStatus(character, TEAM_ID.ENEMY))

	initEventQueue(state);

	state.actionLogs = [];
	state.result = BATTLE_RESULT.NO_RESULT
}

const initialCharacterStatus = (character, teamId) => {
	character.currentStatus = {
		...character.attributes,
	}
	character.currentStatus.damage = getDamage(character.currentStatus)
	character.currentStatus.speed = getSpeed(character.currentStatus)
	character.team = teamId
	console.log('initialed %s\'s status', character.name, character.currentStatus);
}

const initEventQueue = (state) => {
	state.eventQueue = new Queue()
	const characters = state.playerTeam.characters.concat(state.enemyTeam.characters)
	characters.forEach(character => {
		state.eventQueue.insertInOrder(new EventCharacterAction(character));
	})
}

const didStart = (state) => {
	//处理战斗开始之前的计算，比如加载装备和被动技能到状态
	console.log('did start')
	state.start = new Date()
	state.turnCount = 0
}

const doBattle = (state) => {
	while (state.result === 0) {
		state.turnCount++
		// 计算一切可能的效果
		prepareEffects(state);
		// 实施效果
		implementEffects(state);
		// 检查是否战斗结束
		checkContinue(state)

		// 保护机制
		if (state.turnCount >= config.MAX_TURN_LIMIT) {
			state.result = BATTLE_RESULT.ALL_LOSE
		}

		if (state.result === 0) reQueue(state)
	}
}

const checkContinue = (state) => {

	const playerTeamAlive = state.playerTeam.characters.some(character => character.currentStatus.health > 0)

	const enemyTeamAlive = state.enemyTeam.characters.some(character => character.currentStatus.health > 0)

	if (playerTeamAlive && !enemyTeamAlive) {
		state.result = BATTLE_RESULT.PLAYER_WIN
	} else if (!playerTeamAlive && enemyTeamAlive) {
		state.result = BATTLE_RESULT.ENEMY_WIN
	} else if (!playerTeamAlive && !enemyTeamAlive) {
		state.result = BATTLE_RESULT.ALL_LOSE
	} else {
		state.result = BATTLE_RESULT.NO_RESULT
	}

}

const prepareEffects = (state) => {
	state.eventsInTurn = state.eventQueue.getEventsInTurn()
	state.effects = state.eventsInTurn.reduce((effects, event) => {
		const newEffects = event.getEffects(state)
		return effects.concat(newEffects)
	}, [])
}

//Check the alive status, add buffers, dots and other effects.
const implementEffects = (state) => {
	state.effects.forEach(effect => effect.implement())
}

const reQueue = (state) => {
	//Insert the executors in processedQueue back to the eventQueue
	state.eventsInTurn.forEach(event => {
		if (event.hasNextTurn()) {
			state.eventQueue.insertInOrder(event.rebuild())
		}
	})
}

const onEnd = (state) => {
	//处理战斗结果
	console.log('player status', state.playerTeam.characters)
	console.log('enemy status', state.enemyTeam.characters)
	console.log('time cost', `${new Date().getTime() - state.start.getTime()} ms`)
	console.log('turn count', state.turnCount)
	if (state.result == BATTLE_RESULT.ENEMY_WIN) {
		console.log('enemyTeam win!');
	} else if (state.result == BATTLE_RESULT.PLAYER_WIN) {
		console.log('playerTeam win!');
	} else {
		console.log('no win!');
	}
}

battle.compute = (state) => {
	//外部方法
	willStart(state);
	didStart(state);
	doBattle(state);
	onEnd(state);
}

module.exports = battle;