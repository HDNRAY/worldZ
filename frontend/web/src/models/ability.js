import immutable from 'immutable';

export default {

    namespace: 'ability',

    state: immutable.Map({
        showId: 10,
        abilities: [{
            ability: {
                id: 10,
                name: '凌波微步',
                target: ['self'],
                effects: [{
                    time: 'always',
                    method: 'enhance',
                    to: 'movement',
                    value: 5
                }],
                description: '利用念力减少风阻，被动增加移动速度'
            },
            proficiencies: 100
        }, {
            ability: {
                id: 11,
                name: '石猴心经',
                target: ['self'],
                effects: [{
                    time: 'always',
                    method: 'enhance',
                    to: 'movement',
                    value: 5
                }],
                description: '被动增加敏捷，增加$石猴棍法$攻击距离，并使之受到念力增幅'
            },
            proficiencies: 1
        }, {
            ability: {
                id: 0,
                name: '石猴棍法',
                target: ['enemy'],//enemy ,self ,ally
                type: ['physical'], //pyhsical, burning , freeze,
                damage: [{
                    condition: [],
                    source: 'strength',
                    method: 'plus',
                    on: 'final',
                    coefficient: 50
                }, {
                    condition: [],
                    source: 'agility',
                    method: 'plus',
                    on: 'final',
                    coefficient: 50
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
            proficiencies: 2,
        }, {
            ability: {
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
        },
        showDetail: (state, { payload }) => {
            return state.set('showId', payload.id)
        }
    },

};