import { fromJS } from 'immutable'
import { loginRequest } from '../services/user'

export default {

    namespace: 'user',

    state: fromJS({
        characters: []
    }),

    // subscriptions: {
    //     setup({ dispatch, history }) { // eslint-disable-line
    //     },
    // },

    effects: {
        * login({ payload }, { call, put }) { // eslint-disable-line
            try {
                const user = yield call(loginRequest, payload)
                yield put({
                    type: 'userInfoUpdate',
                    payload: {
                        user
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
    },

    reducers: {
        userInfoUpdate(state, action) {
            console.log(action)
            return { ...state }
        }
    },

};