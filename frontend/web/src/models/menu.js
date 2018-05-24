import immutable from 'immutable'

export default {

    namespace: 'menu',

    state: immutable.Map({
        show: false,
        operations: [],
        position: {}
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
        show: (state, { payload }) => {
            return state.set('show', true).set('position', payload.position).set('operations', payload.operations)
        },
        hide: (state) => {
            return state.set('show', false)
        },
        config: (state, { payload }) => {
            return state.set('operations', payload.operations)
        }
    },

};