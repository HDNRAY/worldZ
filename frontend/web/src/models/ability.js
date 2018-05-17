import { fromJS } from 'immutable';

export default {

    namespace: 'ability',

    state: fromJS({
        skills:[]
    }),

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
        },
    },

    effects: {
        * fetch({ payload }, { call, put }) { // eslint-disable-line
            yield put({
                type: 'save'
            });
        },
    },

    reducers: {
        case: (state, { payload }) => {
            return state
        }
    },

};