import Immutable from 'immutable';
// import MovePath from '../services/battle/movePaths'

export default {

    namespace: 'scene',

    state: Immutable.Map({
        sideLength:9,
        clicked: {
            x: -1,
            y: -1
        },
        moveables: {},
        paths: [],
        attackables: new Map(),
        terrain: new Set(),
        enemies: new Set(),
        character: {
            movement: 4,
            coordinate: {
                x: 7, y: 7
            }
        }
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

        showPath: (state, { payload }) => {
            if (!payload.x || !payload.y) return state.set('paths', [])
            const { getPaths } = require('../services/battle/movePaths')

            const character = state.get('character')
            const origin = character.coordinate
            const destination = payload
            const moveables = state.get('moveables')

            const paths = getPaths(origin, moveables, destination)

            return state.set('paths', paths)
        },

        showMoveables: (state, { payload }) => {
            const { getReachables } = require('../services/battle/movePaths')

            const character = state.get('character')
            const movement = character.movement
            const origin = character.coordinate

            const moveables = getReachables(origin, movement)

            return state.set('moveables', moveables)
        }
    },

};