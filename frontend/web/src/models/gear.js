
export default {

	namespace: 'gear',

	state: {
		gears: {
			head: null,

		}
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