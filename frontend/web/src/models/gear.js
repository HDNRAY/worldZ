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
		* unequip({ payload }, { select, put, }) {

			try {
				const gear = yield select(state => {
					console.log(state)
					return state.gear.get('gears').get(payload.position).toJS()
				});
				yield put({
					type: 'inventory/add',
					payload: {
						type: 'gear',
						data: gear
					}
				})
				yield put({
					type: 'remove',
					payload: {
						position: payload.position
					}
				})
			} catch (err) {
				console.log(err)
			}

		},
	},

	reducers: {
		remove(state, { payload }) {
			return state.setIn(['gears', payload.position], null);
		}
	},

};