import immutable from 'immutable'
import { sceneTypes } from '../components/game/scene/constant'

export default {

    namespace: 'scene',

    state: immutable.Map({
        type: sceneTypes.AREA
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
        swtichType: (state, { payload }) => {
            return state.set('type', payload.type)
        }
    },

};