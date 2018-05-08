import { List } from 'immutable';

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
				}
			}
		},
		shownCharacters: [],
		characters: [{
			id: 1,
			name: '61f',
			attributes: {
				agility: 10,
				health: 100,
				attack: 22
			}
		}, {
			id: 1,
			name: '杨过',
			attributes: {
				agility: 10,
				health: 100,
				attack: 22
			}
		}]
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
		get(state, action) {
			let character = state.characters.find((item) => {
				return item.data.id === action.payload.id
			})

			let shownCharacters = List(state.shownCharacters).map((item) => {
				if (item.data.id === character.data.id) {
					item.data = character.data;
				}

				return item;
			})

			return { shownCharacters, ...state };
		},
		save(state, action) {
			return { ...state,
				...action.payload
			};
		},
	},

};