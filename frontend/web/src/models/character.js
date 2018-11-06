import { fromJS } from 'immutable';
import { loadCharacter, createCharacter } from '../services/character';
import { routerRedux } from 'dva/router'

export default {

    namespace: 'character',

    state: fromJS({
        // _id: 0,
        // name: 'Ray',
        attributes: {
            volumn: {
                // health: 5000,
                // spirit: 100,
            },
            basic: {
                // strength: 20,
                // agility: 15,
                // dexterity: 20,
                // stamina: 15,
                // mind: 10,
                // experience: 5,
                // intelligence: 10,
            },
            power: {

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
                const result = yield call(loadCharacter, payload.id)
                console.log(result)
                yield put({
                    type: 'characterInfoUpdate',
                    payload: {
                        id: result.character._id,
                        gender: result.character.gender,
                        name: result.character.name,
                        attributes: result.character.attributes,
                    }
                })

                yield put({
                    type: 'gear/gearInfoUpdate',
                    payload: {
                        wearings: result.character.wearings
                    }
                })

                yield put({
                    type: 'inventory/inventoryInfoUpdate',
                    payload: {
                        inventory: result.character.inventory
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        *create({ payload }, { call, put }) {
            try {
                const character = yield call(createCharacter, payload.character)
                console.log(character)
                yield put({
                    type: 'characterCreated',
                    payload: {
                        character
                    }
                });
                yield put(routerRedux.push('/characer/select'))
            } catch (error) {
                console.log(error)
            }
        },
    },

    reducers: {
        selectCharacter: (state, { payload }) => {
            return state.set('_id', payload.id)
        },
        characterInfoUpdate: (state, { payload }) => {
            return state.merge(payload.character)
        },
        characterCreated: (state, { payload }) => {
            return state.merge(payload.character)
        }
    },

};