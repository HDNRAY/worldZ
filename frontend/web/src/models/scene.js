import { fromJS } from 'immutable';

export default {

    namespace: 'scene',

    state: fromJS({
        clicked: {
            x: -1,
            y: -1
        },
        reachables: [],
        terrain: [],
        enemies: [],

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
        clickOnMap: (state, { payload }) => {

            const { x, y } = payload

            const reachables = [{ x: x + 1, y }, { x, y: y + 1 }, { x: x - 1, y }, { x, y: y - 1 }, { x: x + 1, y: y - 1 }, { x: x + 1, y: y + 1 }]

            return state.set('clicked', fromJS(payload)).set('reachables', fromJS(reachables))
        },

    },

};