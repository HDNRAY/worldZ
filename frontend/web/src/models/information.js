import {List} from 'immutable';

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
		add(state, {payload}) {
			let logs = List(state.logs).unshift(payload);
			if (logs.size > MAX_DISPLAY_LOG_NUMBER) logs = logs.pop();
			return {
				...state,
				logs: logs.toArray()
			}
		},
	},

};