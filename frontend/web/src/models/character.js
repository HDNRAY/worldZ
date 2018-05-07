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
			isLoading: false,
			data: {
				id: 1,
				name: '61f',
				attributes: {
					agility: 10,
					health: 100,
					attack: 22
				}
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
		showCharacter(state, action) {
			let characters = List(state.shownCharacters);

			if (state.shownCharacters.every((item) => {
					return item.data.id !== action.payload.id
				})) {
				characters = characters.push({
					isLoading: false,
					data: {
						id: action.payload.id
					}
				})
			}

			if (characters.length > 3) characters.shift();

			return {
				...state,
				shownCharacters: characters
			}
		},
		hideCharacter(state, action) {
			let characters = List(state.shownCharacters).filter((item) => {
				return item.data.id !== action.payload.id;
			}).toArray();

			return {
				...state,
				shownCharacters: characters
			}
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