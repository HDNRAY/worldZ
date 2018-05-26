import Immutable from 'immutable';
// import MovePath from '../services/battle/movePaths'

export default {

    namespace: 'scene',

    state: Immutable.Map({
        sideLength: 9,
        moveables: {},
        paths: [],
        movingPaths: [],
        attackables: [],
        effectables: [],
        terrain: [],
        enemies: [{
            coordinate: {
                x: 5, y: 5
            }
        }],
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

        move: (state, { payload }) => {
            const character = state.get('character')
            character.coordinate = payload.coordinate
            return state.merge({
                movingPaths: state.get('paths'),
                moveables: [],
                paths: []
            }).set('character', character)
        },

        showEffectables: (state, { payload }) => {
            if (!payload.coordinate) return state.set('effectables', [])
            console.log(payload)
            const origin = payload.coordinate
            const radius = 1

            const { getEffectables } = require('../services/battle/formula')

            return state.set('effectables', getEffectables({
                origin,
                max: radius
            }))
        },

        showAttackables: (state, { payload }) => {
            const character = state.get('character')
            const origin = character.coordinate
            const minDistance = 1;
            const maxDistance = 2;

            const { getAttackables } = require('../services/battle/formula')

            return state.set('attackables', getAttackables({
                origin,
                min: minDistance,
                max: maxDistance
            }))
        },

        showPath: (state, { payload }) => {
            if (!payload.coordinate) return state.set('paths', [])
            const { getPaths } = require('../services/battle/formula')

            const character = state.get('character')
            const origin = character.coordinate
            const destination = payload.coordinate
            const moveables = state.get('moveables')

            const paths = getPaths({
                origin,
                reachables: moveables,
                destination
            })
            return state.set('paths', paths)
        },

        showMoveables: (state, { payload }) => {
            const { getReachables } = require('../services/battle/formula')

            const character = state.get('character')
            const movement = character.movement
            const origin = character.coordinate

            const moveables = getReachables({ origin, movement })

            return state.set('moveables', moveables)
        },

        hideMoveables: (state, { payload }) => {
            return state.set('moveables', {})
        },

        cancel: (state) => {
            return state.merge({
                moveables: {},
                attackables: [],
                effectables: [],
                paths: []
            })
        }
    },

};