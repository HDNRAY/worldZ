import immutable from 'immutable'
import { menuTypes } from '../routes/game/menu/constant'

export default {

    namespace: 'menu',

    state: immutable.Map({
        show: false,
        operations: [],
        position: {},
        menus: []
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
            return state.set('show', true).set('position', payload.position).set('operations', payload.operations).set('menus', [menuTypes.OPERATION])
        },
        hide: (state) => {
            console.log('hide')
            return state.set('show', false)
        },
        push: (state, { payload }) => {
            // let menus = state.get('menus')
            // menus.unshift(payload.type)
            return state.update('menus', menus => {
                return [payload.type, ...menus]
            })
        },
        back: (state, { payload }) => {
            let menus = state.get('menus')
            menus.shift()
            return state.set('menus', menus)
        }

    },

};