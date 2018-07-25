import {fromJS} from 'immutable';

export default {

	namespace: 'character',

	state: fromJS({
		id: 0,
		name: 'Ray',
		attributes: {
			volumn: {
				health: 5000,
				spirit: 100,
			},
			basic: {
				strength: 20,
				agility: 15,
				dexterity: 20,
				stamina: 15,
				mind: 10,
				experience: 5,
				intelligence: 10,
			},
			advanced: {
				speed: 3,
				movement: 0,
				accurancy: 0,
				dodge: 0,
				defense: 0,
				damage: 0,
				resistance: 0,
				bearing: 0,
				learning: 0,
				regeneration: 10,
				restore: 1
			},
			power: {
				burnning: 0,
				voltage: 0,
				freeze: 0,
				telekinetic: 0,
			}
		},
	}),

	subscriptions: {
		setup({
			dispatch,
			history
		}) { // eslint-disable-line
		},
	},

	effects: {
		* fetch({
			payload
		}, {
			call,
			put
		}) { // eslint-disable-line
			yield put({
				type: 'save'
			});
		},
	},

	reducers: {

	},

};