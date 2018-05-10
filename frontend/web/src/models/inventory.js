export default {

	namespace: 'inventory',

	state: {
		gears: [{ name: '光之剑', quality: 'legend', type: '剑', position: 'twoHand', description: 'Gorn Nova', damage: 100, weight: 1.5, effects: [{ description: '可对灵体造成伤害' }, { description: '可附着魔法，提高斩击威力' }] }],
		spendables: [{ name: '面包', quantity: 5, quality: 'normal' }]
	},

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
	},

	reducers: {
		equip(state, action) {

			return {
				...state
			}
		},
		topWindow(state, action) {
			return {
				...state,
				topWindowId: action.payload.id
			}
		}
	},

};