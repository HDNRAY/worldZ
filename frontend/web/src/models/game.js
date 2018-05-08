import Immutable from 'immutable';

export default {

	namespace: 'game',

	state: {
		topWindowId: 0,
		windows: {
			basic: {
				id: 0,
				loading: true,
				show: true,
				position: {
					x: 10,
					y: 10
				}
			},
			inventory: {
				id: 4,
				show: false,
				loading: false,
				position: {
					x: 50,
					y: 50
				}
			},
			character: {
				id: 1,
				show: false,
				loading: false,
				position: {
					x: 90,
					y: 90
				}
			},
			map: {
				id: 2,
				show: false,
				loading: false,
				position: {
					x: 130,
					y: 130
				}
			},
			gear: {
				id: 3,
				show: false,
				loading: false,
				position: {
					x: 170,
					y: 170
				}
			},
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
		switchWindow(state, { payload }) {
			const windows = Immutable.fromJS(state.windows).toJSON();
			windows[payload.name].show = !windows[payload.name].show;

			return {
				...state,
				windows
			}
		},
		topWindow(state, { payload }) {
			return {
				...state,
				topWindowId: payload.id
			}
		}
	},

};