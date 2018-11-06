import { fromJS, Map } from 'immutable';

export default {

    namespace: 'inventory',

    state: fromJS({
        items: []
        // items: [{
        //     id: 4, itemType: 0, name: '短匕4', quality: 0, types: [2], position: [10, 11], description: '', effects: [], weight: 1, damage: 1
        // }, {
        //     id: 3, itemType: 0, name: '短匕3', quality: 0, types: [2], position: [10, 11], description: '', effects: [], weight: 1, damage: 1
        // }, {
        //     id: 2, itemType: 0, name: '银铃胸甲', quality: 1, types: [4], position: [3], description: '银铃胸甲，五金一件', effects: [], weight: 3
        // }, {
        //     id: 0, itemType: 0, name: '光之剑', quality: 3, types: [0, 1], position: [10], description: 'Gorn Nova', damage: 100, weight: 1.5, effects: [{ description: '可对灵体造成伤害' }, { description: '可附着魔法，提高斩击威力' }]
        // }, {
        //     id: 11,
        //     itemType: 0,
        //     name: '玄铁剑',
        //     quality: 2,
        //     weight: 10,
        //     damage: 110,
        //     types: [0, 1,],
        //     position: [10],
        //     description: '重剑无锋，大巧不工',
        //     effects: [{
        //         description: ''
        //     }]
        // }, { id: 101, itemType: 1, name: '面包', quantity: 5, quality: 0, description: '回复体力' }]
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
        inventoryInfoUpdate(state, { payload }) {
            return state.merge({
                items: payload.inventory.map(item => ({
                    ...item.object,
                    id: item._id,
                    itemType: item.itemType
                }))
            })
        }
    },

};