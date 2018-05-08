import { List } from 'immutable';

const MAX_DISPLAY_LOG_NUMBER = 20;

export default {

	namespace: 'information',

	state: {
		logs: []
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
		add(state, action) {
			let logs = List(state.logs).push(action.payload);
			if (logs.size > MAX_DISPLAY_LOG_NUMBER) logs = logs.shift()
			return {
				...state,
				logs: logs.toArray()
			}
		},
	},

};