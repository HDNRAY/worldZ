const EVENT_TYPE = {
	CHARACTER_TURN: 1,
}

let battle = {};

let willStart = (state) => {
	console.log('will start')

	for (let character of state.characters) {
		initialStatus(character)
	}

	state.actions = [];
	state.actionLogs = [];
	state.eventQueue = initQueue(state);
	state.processedQueue = [];
	state.playerTeam = [state.characters[0]];
	state.characters[0].team = 0;
	state.enemyTeam = [state.characters[1]];
	state.characters[1].team = 1;
	state.winner = 0;
}

let initQueue = ({ characters }) => {
	let queue = [{
		type: EVENT_TYPE.CHARACTER_TURN,
		executor: characters[0],
		leftTime: characters[0].attributes.atk_period
	}];

	for (let i = 1; i < characters.length; i++) {
		let character = characters[i];
		let event = {
			type: EVENT_TYPE.CHARACTER_TURN,
			executor: character,
			leftTime: character.attributes.atk_period
		};
		insertInOrder(event, queue);
	}
	return queue;
}

let initialStatus = (character) => {
	character.currentStatus = {
		...character.attributes
	}
	console.log('initialed %s\'s status', character.name, character.currentStatus);
}
let didStart = (state) => {
	//处理战斗开始之前的计算，比如加载装备和被动技能到状态
	console.log('did start')
}

let process = (state) => {
	console.log('Process start:');

	state.actions = prepareActions(state);
	timeGoesBy(state);
	doActions(state);
	backActions(state);
	if (!checkContinue(state)) return state;

	reQueue(state);

	return process(state);
}
/*
let checkContinue = ({characters})=>{
    let shouldContinue = true;
    let alive = {}
    for(let character of characters){
        let team = character.team
        if(!alive.team)alive.team = 0;
        alive.team += character.health > 0 ? 1 : 0;
    }

    for(let team in alive){
        if(alive.team == 0)shouldContinue = false
    }

    return shouldContinue;
}
*/
let checkContinue = (state) => {
	if (state.playerTeam.length == 0 && state.enemyTeam.length > 0) {
		state.winner = 2;
		return false;
	} else if (state.playerTeam.length > 0 && state.enemyTeam.length == 0) {
		state.winner = 1;
		return false;
	} else if (state.playerTeam.length == 0 && state.enemyTeam.length == 0) {
		state.winner = 0;
		return false;
	} else {
		return true;
	}
}

let actionFromEvent = (event, state) => {
	if (event.type != EVENT_TYPE.CHARACTER_TURN) {
		console.log('Unsupported event type!');
	}

	let action = {
		executor: event.executor,
		target: event.executor.team == 0 ? state.enemyTeam[0] : state.playerTeam[0],
		attackValue: event.executor.attributes.attack,
		fixDamage: 0,
		extraDamege: 0,
		//You can add any effects you want here...
	}
	return action;
}

let prepareActions = (state) => {
	let frontEvent = state.eventQueue.shift();
	let actions = [actionFromEvent(frontEvent, state)];
	state.processedQueue.push(frontEvent);
	while (state.eventQueue.length > 0) {
		if (state.eventQueue[0].leftTime == frontEvent.leftTime) {
			let parallelEvent = state.eventQueue.shift();
			actions.push(actionFromEvent(parallelEvent, state));
			state.processedQueue.push(parallelEvent);
		} else {
			break;
		}
	}
	return actions;
}


let timeGoesBy = ({ actions }) => {

}

//Calculate damages and reduce the health.
//Need to consider defense, avoidance, resistance here, in future.
let doActions = (state) => {
	for (let i = 0; i < state.actions.length; i++) {
		console.log(state.actions[i].executor.name + ' attack ' + state.actions[i].target.name +
			': ' + state.actions[i].attackValue + ' demage.');
		state.actions[i].target.attributes.health -= state.actions[i].attackValue;
		console.log(state.actions[i].target.name + ' HP: ' + state.actions[i].target.attributes.health);
	}
}

//Check the alive status, add buffers, dots and other effects.
let backActions = (state) => {
	for (let i = 0; i < state.actions.length; i++) {
		if (state.actions[i].target.attributes.health <= 0) {
			state.actions[i].target.alive = 0;
			console.log(state.actions[i].target.name + ' dead!');
		}
	}

	//If character is dead, remove it from its team.
	for (let i = 0; i < state.characters.length; i++) {
		if (state.characters[i].alive == 0) {
			if (state.characters.team == 0) {
				state.playerTeam.splice(0, 1);
			} else {
				state.enemyTeam.splice(0, 1);
			}
		}
	}

}

let insertInOrder = (event, queue) => {
	//Can be optimized with binary search
	let i = 0;
	for (; i < queue.length; i++) {
		console.log('Inseret: ' + event.executor.attributes.atk_period + ' : ' + queue[i].leftTime);
		if (event.executor.attributes.atk_period <= queue[i].leftTime) {
			console.log('Splice @' + i);
			queue.splice(i, 0, event);
			break;
		}
	}
	if (i == queue.length) {
		console.log('Splice @' + i);
		queue.splice(i, 0, event);
	}

}

let reQueue = (state) => {
	console.log('reQueue');
	//Calculate the rest time for each charactor.
	for (let event of state.eventQueue) {
		console.log(event.executor.name + " leftTime: " + event.leftTime + ", -" + state.processedQueue[0].leftTime);
		event.leftTime -= state.processedQueue[0].leftTime;
	}

	//Insert the executors in processedQueue back to the eventQueue
	let processedQueue = state.processedQueue;
	for (let i = 0; i < processedQueue.length; i++) {
		let event = {
			type: EVENT_TYPE.CHARACTER_TURN,
			executor: processedQueue[i].executor,
			leftTime: processedQueue[i].executor.attributes.atk_period
		};
		insertInOrder(event, state.eventQueue);
	}

	//Clear data of the round
	processedQueue.splice(0, processedQueue.length);
	state.actions.splice(0, state.actions.length);
}


let onEnd = (state) => {
	//处理战斗结果
	if (state.winner == 2) {
		console.log('enemyTeam win!');
	} else if (state.winner == 1) {
		console.log('playerTeam win!');
	} else {
		console.log('no win!');
	}
}
battle.compute = (state) => {
	//外部方法
	willStart(state);
	didStart(state);
	process(state);
	onEnd(state);
}

module.exports = battle;