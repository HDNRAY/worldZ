import { fromJS } from 'immutable'
import { loginRequest, userInfoRequest } from '../services/user'
import { loadAllCharacters } from '../services/character';

export const loginStates = {
    NOT_DECIDED: 0,
    LOGGED_IN: 1,
    NOT_LOGGED_IN: 2
}

export default {

    namespace: 'user',

    state: fromJS({
        isLogging: false,
        characters: [],
        characterLimit: 6,
        username: '',
        _id: null,
        loginState: loginStates.NOT_DECIDED,
        message: ''
    }),

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
        },
    },

    effects: {
        *loadCharacters({ payload }, { call, put }) {
            try {
                const result = yield call(loadAllCharacters)
                yield put({
                    type: 'userInfoUpdate',
                    payload: {
                        characters: result.characters
                    }
                });
            } catch (error) {
                console.log(error)
            }
        },
        * login({ payload }, { call, put }) { // eslint-disable-line
            try {
                yield put({
                    type: 'userInfoUpdate',
                    payload: {
                        isLogging: true
                    }
                })
                const response = yield call(loginRequest, payload)
                yield put({
                    type: 'userInfoUpdate',
                    payload: {
                        ...response.user,
                        loginState: loginStates.LOGGED_IN
                    }
                })
            } catch (error) {
                yield put({
                    type: 'userMessageUpdate',
                    payload: {
                        message: error.message,
                        loginState: loginStates.NOT_LOGGED_IN
                    }
                })
            }
        },
        *info({ payload }, { call, put }) {
            try {
                const result = yield call(userInfoRequest)
                yield put({
                    type: 'userInfoUpdate',
                    payload: {
                        ...result.user,
                        loginState: loginStates.LOGGED_IN
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
    },

    reducers: {
        userInfoUpdate(state, { payload }) {
            return state.merge(payload)
        },
        userMessageUpdate(state, { payload }) {
            return state.merge(payload)
        }
    },

};