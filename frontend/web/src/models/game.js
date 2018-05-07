export default {

	namespace: 'game',

	state: {
		name: 'WorldZ',
		showInventory: false,
		showMyCharacter: false
	},

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
		},
	},

	effects: {
		* fetch({
			payload
		}, {
			call,
			put
		}) { // eslint-disable-line
			yield put({
				type: 'save'
			});
		},
	},

	reducers: {
		switchMyCharacter(state, action) {
			return {
				...state,
				showInventory: !state.showInventory
			}
		},
		switchInventory(state, action) {
			return {
				...state,
				showInventory: !state.showInventory
			}
		},
		save(state, action) {
			return {
				...state,
				...action.payload
			};
		},
	},

};