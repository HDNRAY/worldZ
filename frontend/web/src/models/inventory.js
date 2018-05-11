import { fromJS, Map } from 'immutable';

export default {

	namespace: 'inventory',

	state: fromJS({
		gear: [{ id: 0, name: '光之剑', quality: 'legend', type: '剑', position: 'twoHand', description: 'Gorn Nova', damage: 100, weight: 1.5, effects: [{ description: '可对灵体造成伤害' }, { description: '可附着魔法，提高斩击威力' }] }],
		spendable: [{ id: 0, name: '面包', quantity: 5, quality: 'normal' }]
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
		* equip({ payload }, { put }) {
			try {
				const { gear } = payload;
				yield put({
					type: 'gear/unequip',
					payload: {
						position: payload.gear.position
					},
				});
				yield put({
					type: 'gear/update',
					payload: {
						gear: gear
					}
				});
				yield put({
					type: 'remove',
					payload: {
						type: 'gear',
						gear: gear
					}
				})
			} catch (err) {
				console.log(err)
				yield put({
					type: 'information/add',
					payload: err.toString()
				})
			}

		}
	},

	reducers: {
		add(state, { payload }) {
			const { type, data } = payload;
			return state.updateIn([type], (items) => {
				return items.push(Map(data));
			});
		},
		remove(state, { payload }) {
			const { type, gear } = payload;
			return state.updateIn([type], (items) => {
				const index = items.findIndex((item) => {
					return item.get('id') === gear.id;
				})
				return items.delete(index)
			})
		},
		topWindow(state, action) {
			return {
				...state,
				topWindowId: action.payload.id
			}
		}
	},

};