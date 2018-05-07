export default {

	namespace: 'user',

	state: {
		characters: [{
			id: 0
		}]
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
		get(state, action) {
			return { ...state }
		}
	},

};