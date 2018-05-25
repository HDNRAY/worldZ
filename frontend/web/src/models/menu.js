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
            console.log(payload)
            let newState = state
            if(payload.operations) newState = newState.set('operations',payload.operations)
            if(payload.position) newState = newState.set('position',payload.position)
            
            return newState
        }
    },

};