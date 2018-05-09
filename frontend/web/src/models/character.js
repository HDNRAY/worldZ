export default {

	namespace: 'character',

	state: {
		myCharacter: {
			isLoading: false,
			data: {
				id: 0,
				name: 'Ray',
				attributes: {
					agility: 10,
					health: 100,
					attack: 22
				},
				gears: {
					head: null
				}
			}
		},
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) { // eslint-disable-line
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
		getMyCharacter(state, action) {
			return { ...state };
		},
	},

};