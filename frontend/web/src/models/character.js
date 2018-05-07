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
		shownCharacters: [{
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
			let characters = List(state.shownCharacters).push({
				isLoading: false,
				data: {
					id: action.payload.id
				}
			}).toArray();

			return {
				...state,
				shownCharacters: characters
			}
		},
		hideCharacter(state, action) {
			let characters = List(state.shownCharacters).filter((item) => {
				return item.data.id !== action.payload.id
			}).toArray();
			console.log(characters);
			return {
				...state,
				shownCharacters: characters
			}
		},
		get(state, action) {
			return { ...state };
		},
		save(state, action) {
			return { ...state,
				...action.payload
			};
		},
	},

};