import Immutable from 'immutable';

export default {

	namespace: 'game',

	state: Immutable.fromJS({
		topWindowId: 0,
		windows: {
			basic: {
				id: 0,
				loading: false,
				show: true,
				position: {
					x: 1,
					y: 1
				}
			},
			inventory: {
				id: 4,
				show: false,
				loading: false,
				position: {
					x: 320,
					y: 0
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
					x: 300,
					y: 180
				}
			},
			gear: {
				id: 3,
				show: false,
				loading: false,
				position: {
					x: 0,
					y: 210
				}
			},
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
	},

	reducers: {
		switchWindow: (state, { payload }) => {
			return state.setIn(['windows', payload.name, 'show'], !state.get('windows').toJS()[payload.name].show)
		},
		topWindow: (state, { payload }) => {
			return state.set('topWindowId', payload.id)
		}
	},

};