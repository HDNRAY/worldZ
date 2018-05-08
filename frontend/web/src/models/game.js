import { Map } from 'immutable';

export default {

	namespace: 'game',

	state: {
		topWindowId: 0,
		name: 'WorldZ',
		showing: {
			inventory: false,
			character: false,
			map: false
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
		switchWindow(state, action) {
			const name = action.payload.name;
			const showing = Map(state.showing);
			return {
				...state,
				showing: showing.set(name, !showing.get(name)).toJSON()
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