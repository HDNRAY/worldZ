import { fromJS, Map } from 'immutable';

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
			twoHand: {
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
			firstHand: null,
			offHand: null,
			fingers: [],
		}
	}),

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
		},
	},

	effects: {
		* unequip({ payload }, { select, put, }) {
			try {
				const { position } = payload;
				const gear = yield select(state => {
					return state.gear.get('gears').get(position).toJS()
				})
				console.log(gear)
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
						gear: gear
					}
				})
			} catch (err) {
				console.log(err)
			}

		},
	},

	reducers: {
		update(state, { payload }) {
			console.log(state.setIn(['gears', payload.gear.position], Map(payload.gear)).toJS())
			return state.setIn(['gears', payload.gear.position], Map(payload.gear));
		},
		remove(state, { payload }) {
			return state.setIn(['gears', payload.gear.position], null);
		}
	},

};