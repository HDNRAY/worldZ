import { fromJS } from 'immutable';
import { loadCharacter } from '../services/character';

export default {

    namespace: 'character',

    state: fromJS({
        id: 0,
        name: 'Ray',
        attributes: {
            volumn: {
                health: 5000,
                spirit: 100,
            },
            basic: {
                strength: 20,
                agility: 15,
                dexterity: 20,
                stamina: 15,
                mind: 10,
                experience: 5,
                intelligence: 10,
            }
        },
    }),

    subscriptions: {
        setup({
            dispatch,
            history
        }) { // eslint-disable-line
        },
    },

    effects: {
        * load({ payload }, { call, put }) {
            try {
                const character = yield call(loadCharacter, payload.id)
                console.log(character)
                yield put({
                    type: 'characterInfoUpdate',
                    payload: {
                        character
                    }
                });
            } catch (error) {

            }
        },
    },

    reducers: {
        characterInfoUpdate: (state, { payload }) => {
            return state.merge(payload.character)
        }
    },

};