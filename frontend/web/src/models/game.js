import Immutable from 'immutable';

export default {

	namespace: 'game',

	state: Immutable.fromJS({
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
					x: 250,
					y: 10
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
			return state.setIn(['windows', payload.name, 'show'], !state.get('windows').toJSON()[payload.name].show)
		},
		topWindow: (state, { payload }) => {
			return state.set('topWindowId', payload.id)
		}
	},

};