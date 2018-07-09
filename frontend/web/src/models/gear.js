import { fromJS, Map } from 'immutable';

export default {

	namespace: 'gear',

	state: fromJS({
		wearings: {
			head: null,
			neck: null,
			shoulders: null,
			torso: null,
			wrists: null,
			hands: null,
			waist: null,
			legs: null,
			feets: null,
			firstHand: null,
			offHand: null,
			fingers: [],
		},
		// wearings: []
	}),

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
		},
	},

	effects: {
		* equip({ payload }, { put }) {
			try {
				const { gear } = payload;

				yield put({
					type: 'equip',
					payload: {
						gear
					}
				})
			} catch (err) {
				console.log(err)
			}
		},
		* unequip({ payload }, { put }) {
			try {
				const { position } = payload;

				yield put({
					type: 'unequip',
					payload: {
						position
					}
				})
			} catch (err) {
				console.log(err)
			}
		},
		* switchHand({ payload }, { put }) {
			try {
				yield put({
					type: 'switchHand',
				})
			} catch (err) {
				console.log(err)
			}
		},
	},

	reducers: {
		equip(state, { payload }) {
			return state.setIn(['wearings', payload.gear.position], payload.gear);
		},
		unequip(state, { payload }) {
			return state.update('wearings', list => list.map(item => {
				if (item.position === payload.position) {
					return null
				}
				return item
			}))
		},
		switchHand(state, { payload }) {
			const offHand = state.getIn(['wearings', 'offHand'])
			return state.setIn(['wearings', 'offHand'], state.getIn(['wearings', 'firstHand'])).setIn(['wearings', 'firstHand'], offHand)
		}
	},

};