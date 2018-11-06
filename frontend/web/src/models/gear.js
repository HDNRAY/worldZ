import { fromJS } from 'immutable'
import { equipGear, unequipGear } from '../services/character';

export default {

    namespace: 'gear',

    state: fromJS({
        // wearings: {
        //     head: null,
        //     neck: null,
        //     shoulders: null,
        //     torso: null,
        //     wrists: null,
        //     hands: null,
        //     waist: null,
        //     legs: null,
        //     feets: null,
        //     firstHand: 11,
        //     offHand: null,
        //     fingers: [],
        // },
        wearings: []
    }),

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
        },
    },

    effects: {
        * equip({ payload }, { call, put }) {
            try {
                const { gearId } = payload
                const result = yield call(equipGear, { gearId })

                yield put({
                    type: 'gearInfoUpdate',
                    payload: {
                        wearings: result.wearings
                    }
                })
            } catch (err) {
                console.log(err)
            }
        },
        * unequip({ payload }, { call, put }) {
            try {
                const { position } = payload
                const result = yield call(unequipGear, { position })

                yield put({
                    type: 'gearInfoUpdate',
                    payload: {
                        wearings: result.wearings
                    }
                })
            } catch (err) {
                console.log(err)
            }
        },
    },

    reducers: {
        gearInfoUpdate(state, { payload }) {
            console.log(payload)
            return state.merge(payload)
        },
    },
};