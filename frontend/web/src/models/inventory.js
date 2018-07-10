import { fromJS, Map } from 'immutable';

export default {

	namespace: 'inventory',

	state: fromJS({
		items: [{
			id: 4, itemType: 'gear', name: '短匕4', quality: 'normal', types: ['dagger'], position: ['firstHand', 'offHand'], description: '', effects: [], weight: 1, damage: 1
		}, {
			id: 3, itemType: 'gear', name: '短匕3', quality: 'normal', types: ['dagger'], position: ['firstHand', 'offHand'], description: '', effects: [], weight: 1, damage: 1
		}, {
			id: 2, itemType: 'gear', name: '银铃胸甲', quality: 'magic', types: ['torso'], position: ['torso'], description: '银铃胸甲，五金一件', effects: [], weight: 3
		}, {
			id: 0, itemType: 'gear', name: '光之剑', quality: 'legend', types: ['twoHand', 'sword'], position: ['firstHand'], description: 'Gorn Nova', damage: 100, weight: 1.5, effects: [{ description: '可对灵体造成伤害' }, { description: '可附着魔法，提高斩击威力' }]
		}, {
			id: 11,
			itemType: 'gear',
			name: '玄铁剑',
			quality: 'epic',
			weight: 10,
			damage: 110,
			types: ['twoHand', 'sword',],
			position: ['firstHand'],
			description: '重剑无锋，大巧不工',
			effects: [{
				description: ''
			}]
		}, { id: 101, itemType: 'spendable', name: '面包', quantity: 5, quality: 'normal', description: '回复体力' }]
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
		add(state, { payload }) {
			const { type, data } = payload;
			return state.updateIn([type], (items) => {
				return items.push(Map(data));
			});
		},
		remove(state, { payload }) {
			const { type, gear } = payload;
			return state.update(type, (items) => {
				const index = items.findIndex((item) => {
					return item.get('id') === gear.id;
				})
				return items.delete(index)
			})
		},
		topWindow(state, action) {
			return {
				...state,
				topWindowId: action.payload.id
			}
		}
	},

};