import immutable from 'immutable';

const MAX_DISPLAY_LOG_NUMBER = 20;

export default {

	namespace: 'information',

	state: immutable.fromJS({
		logs: []
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
	},

	reducers: {
		add(state, { payload }) {
			return state.update('logs', logs => {
				let newLogs = logs.unshift(payload)
				if (newLogs.size > MAX_DISPLAY_LOG_NUMBER) newLogs = newLogs.pop()
				return newLogs
			})
		},
	},

};