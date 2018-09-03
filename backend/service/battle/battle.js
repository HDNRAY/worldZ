'use strict'

const { EVENT_TYPE, TEAM_ID, EFFECT_TYPE, BATTLE_RESULT } = require('./constant')
const config = require('./config')

const battle = {};

const willStart = (state) => {
	console.log('will start')

	state.playerTeam.characters.forEach(character => initialCharacterStatus(character, TEAM_ID.PLAYER))
	state.enemyTeam.characters.forEach(character => initialCharacterStatus(character, TEAM_ID.ENEMY))

	const characters = state.playerTeam.characters.concat(state.enemyTeam.characters)
	state.eventQueue = initEventQueue(characters);

	state.actionLogs = [];
	state.result = BATTLE_RESULT.NO_RESULT
}

const initialCharacterStatus = (character, teamId) => {
	character.currentStatus = {
		...character.attributes
	}
	character.team = teamId
	console.log('initialed %s\'s status', character.name, character.currentStatus);
}

const initEventQueue = (characters) => {
	// character fisrt temporarily
	const queue = [{
		type: EVENT_TYPE.BATTLE_START_TURN,
		executor: battle,
		leftTime: 0
	}];

	characters.forEach(character => {
		const event = {
			type: EVENT_TYPE.CHARACTER_TURN,
			executor: character,
			leftTime: character.currentStatus.atk_period
		};
		insertInOrder(event, queue);
	})

	return queue;
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
		// 计算当前回合执行的行动（因为可能有多个行动在同一时间点执行，为保证互相不影响则需先计算再实施）
		prepareActions(state);
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

	const playerTeamAlive = state.playerTeam.characters.some(character => {
		return character.currentStatus.health > 0
	})

	const enemyTeamAlive = state.enemyTeam.characters.some(character => {
		return character.currentStatus.health > 0
	})

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

const actionFromEvent = (event, state) => {
	// change to action builder , in future
	let action
	if (event.type === EVENT_TYPE.CHARACTER_TURN) {
		const targetTeam = event.executor.team == TEAM_ID.PLAYER ? state.enemyTeam : state.playerTeam
		const targetChoices = targetTeam.characters.filter(character => character.currentStatus.health > 0)
		action = {
			executor: event.executor,
			targets: [targetChoices[0]],
			type: EVENT_TYPE.CHARACTER_TURN
			//You can add any effects you want here...
		}
	}
	if (!action) action = {
		type: event.type
	}
	//console.log('action:', action)
	state.actionLogs.push(action)
	return action;
}

const prepareActions = (state) => {
	const frontEvent = state.eventQueue.shift();
	const actionsInTurn = [actionFromEvent(frontEvent, state)];
	const eventsInTurn = [frontEvent];
	while (state.eventQueue.length > 0) {
		if (state.eventQueue[0].leftTime == frontEvent.leftTime) {
			const parallelEvent = state.eventQueue.shift();
			actionsInTurn.push(actionFromEvent(parallelEvent, state));
			eventsInTurn.push(parallelEvent);
		} else {
			break;
		}
	}
	state.actionsInTurn = actionsInTurn
	state.eventsInTurn = eventsInTurn
}

//Calculate damages and reduce the health.
//Need to consider defense, avoidance, resistance here, in future.
const prepareEffects = (state) => {
	state.effects = state.actionsInTurn.reduce((effects, action) => {
		if (action.type === EVENT_TYPE.CHARACTER_TURN) {
			const effect = {
				target: action.targets[0],
				attribute: 'health',
				value: -action.executor.currentStatus.attack,
				type: EFFECT_TYPE.DIRECT_DAMAGE
			}
			effects.push(effect)
		}

		return effects
	}, [])
}

//Check the alive status, add buffers, dots and other effects.
const implementEffects = (state) => {
	state.effects.forEach(effect => {
		if (effect.type === EFFECT_TYPE.DIRECT_DAMAGE) {
			effect.target.currentStatus[effect.attribute] += effect.value
			if (effect.target.health <= 0) console.log(effect.target.name + ' dead!');
		}
	})
}

const insertInOrder = (event, queue) => {
	//Can be optimized with binary search
	let i = 0;
	for (; i < queue.length; i++) {
		// console.log('Insert: ' + event.executor.currentStatus.atk_period + ' : ' + queue[i].leftTime);
		if (event.executor.currentStatus.atk_period <= queue[i].leftTime) {
			// console.log('Splice @' + i);
			queue.splice(i, 0, event);
			break;
		}
	}
	if (i == queue.length) {
		// console.log('Splice @' + i);
		queue.splice(i, 0, event);
	}
}

const reQueue = (state) => {
	//console.log('reQueue:');
	//Calculate the rest time for each charactor.
	const timeGoesBy = state.eventsInTurn[0].leftTime
	state.eventQueue.forEach(event => {
		event.leftTime -= timeGoesBy
	})

	//Insert the executors in processedQueue back to the eventQueue
	state.eventsInTurn.forEach(eventInTurn => {
		if (eventInTurn.type === EVENT_TYPE.CHARACTER_TURN) {
			if (eventInTurn.executor.currentStatus.health > 0) {
				const newEvent = {
					type: EVENT_TYPE.CHARACTER_TURN,
					executor: eventInTurn.executor,
					leftTime: eventInTurn.executor.currentStatus.atk_period
				}
				insertInOrder(newEvent, state.eventQueue);
			}
		}
	})
}

const onEnd = (state) => {
	//处理战斗结果
	console.log('player status', state.playerTeam.characters)
	console.log('enemy status', state.enemyTeam.characters)
	console.log('actions count', state.actionLogs.length)
	console.log('start', state.start.getTime())
	console.log('end', new Date().getTime())
	console.log('time cost', new Date().getTime() - state.start.getTime())
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