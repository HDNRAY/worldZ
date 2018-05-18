import { fromJS } from 'immutable';

export default {

    namespace: 'ability',

    state: fromJS({
        skills: [{
            skill: {
                id: 0,
                name: '英勇打击',
                target: ['enemy'],//enemy ,self ,ally
                type: ['physical'], //pyhsical, burning , freeze,
                damage: [{
                    condition: [],
                    source: 'strength',
                    method: 'plus',
                    on: 'final',
                    coefficient: 100
                }],
                cost: 1,
                cooldown: 1,
                effects: [{
                    time: 'before',
                    method: 'enhance',
                    to: 'strength',
                    value: 10
                }],
                difficulty: 10
            },
            proficiencies: 1,
        }, {
            skill: {
                id: 1,
                name: '灼热',
                target: ['enemy'],
                type: ['burning'], //pyhsical, burning , freeze,
                damage: [],
                cost: 1,
                cooldown: 1,
                effects: [{
                    time: 'after',
                    method: 'dot',
                    to: 'health',
                    value: 2
                }],
                difficulty: 10
            },
            proficiencies: 2,
        }]
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
        cast: (state, { payload }) => {
            return state
        }
    },

};