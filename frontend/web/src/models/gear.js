import { fromJS } from 'immutable';

export default {

	namespace: 'gear',

	state: fromJS({
		gears: {
			head: null,
			neck: null,
			shoulders: null,
			torso: null,
			wrists: null,
			hands: null,
			waist: null,
			legs: null,
			feets: null,
			firstHand: {
				name: '玄铁剑',
				quality: 'epic',
				weight: 10,
				damage: 110,
				type: '剑',
				position: 'twoHand',
				description: '重剑无锋，大巧不工',
				effects: [{
					description: ''
				}]
			},
			offHand: null,
			fingers: [],
		}
	}),

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
		},
	},

	effects: {
		* fetch({ payload }, { call, put }) { // eslint-disable-line
			yield put({
				type: 'save'
			});
		},
		* unequip(action, param) {
			console.log(action)
			console.log(param)
			// try {
			// 	const gear = yield select(state => state.gear[payload.position])
			// 	yield put({
			// 		type: 'inventory/add'
			// 		payload: {
			// 			gear
			// 		}
			// 	})
			// }

		},
	},

	reducers: {
		remove(state, { payload }) {
			return state.setIn(['gears', payload.position], null);
		}
	},

};