import {fromJS} from 'immutable';

export default {

	namespace: 'game',

	state: fromJS({
		topWindowId: 0,
		windows: {
			basic: {
				loading: false,
				show: true,
			},
			inventory: {
				show: false,
				loading: false,
			},
			character: {
				show: false,
				loading: false,
			},
			map: {
				show: false,
				loading: false,
			},
			gear: {
				show: false,
				loading: false,
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
			console.log(state.mergeIn(payload))
			return state.setIn(['windows', payload.name, 'show'], !state.get('windows').toJS()[payload.name].show)
		},
		topWindow: (state, { payload }) => {
			return state.set('topWindowId', payload.id)
		}
	},

};