import { fromJS } from 'immutable'
import { loginRequest } from '../services/user'

export const loginStates = {
    NOT_DECIDED: 0,
    LOGGED_IN: 1,
    NOT_LOGGED_IN: 2
}

export default {

    namespace: 'user',

    state: fromJS({
        characters: [],
        username: '',
        _id: null,
        loginState: loginStates.NOT_DECIDED,
        message: ''
    }),

    // subscriptions: {
    //     setup({ dispatch, history }) { // eslint-disable-line
    //     },
    // },

    effects: {
        * login({ payload }, { call, put }) { // eslint-disable-line
            try {
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
    },

    reducers: {
        userInfoUpdate(state, { payload }) {
            console.log(payload)
            return state.merge(payload)
        },
        userMessageUpdate(state, { payload }) {
            return state.merge(payload)
        }
    },

};