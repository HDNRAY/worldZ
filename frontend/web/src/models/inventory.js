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
		}, { id: 0, itemType: 'spendable', name: '面包', quantity: 5, quality: 'normal', description: '回复体力' }]
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
		unequip(state, { payload }) {
			// const gear = Map(payload.gear);
			return state.updateIn(['gear'], items => {
				return items.push(state.getIn(['wearings', payload.position]))
			}).setIn(['wearings', payload.position], null)
		},
		switchHand(state, { payload }) {

			const hands = {
				firstHand: state.getIn(['wearings', 'firstHand']),
				offHand: state.getIn(['wearings', 'offHand'])
			}

			return ['firstHand', 'offHand'].reduce((newState, fromHand) => {
				let toHand = fromHand === 'firstHand' ? 'offHand' : 'firstHand';

				if (!!hands[fromHand]) {
					if (hands[fromHand].get('position').size > 1) {
						return newState.setIn(['wearings', toHand], hands[fromHand]);
					} else {
						return newState.updateIn(['gear'], items => {
							return items.push(hands[fromHand])
						}).setIn(['wearings', toHand], null);
					}
				} else {
					return newState.setIn(['wearings', toHand], null);
				}
			}, state)
		},
		equip(state, { payload }) {

			const unequip = (state, position) => {
				return state.updateIn(['gear'], items => {
					return items.push(state.getIn(['wearings', position]))
				}).setIn(['wearings', position], null)
			}

			const gearToEquip = fromJS(payload.gear);
			let newState = state, positionToEquip = null;

			if (gearToEquip.get('types').includes('twoHand')) {
				if (!!state.getIn(['wearings', 'firstHand'])) newState = unequip(newState, 'firstHand');
				if (!!state.getIn(['wearings', 'offHand'])) newState = unequip(newState, 'offHand');
				positionToEquip = 'firstHand'
			} else {

				const posiblePositions = gearToEquip.get('position');

				//如果是把单手武器，则检查是否主手是双手武器，若是，则卸下
				if ((posiblePositions.includes('firstHand')
					|| posiblePositions.includes('offHand'))
					&& !!state.getIn(['wearings', 'firstHand'])
					&& state.getIn(['wearings', 'firstHand', 'types']).includes('twoHand')) {
					newState = unequip(newState, 'firstHand');
				}

				//如果任意可装备位置为空，则选择此位置装备
				positionToEquip = gearToEquip.get('position').find((item) => {
					console.log(item)
					console.log(newState.getIn(['wearings', item]))
					if (newState.getIn(['wearings', item]) === null) {
						positionToEquip = item;
						return true;
					}

					return false;
				})

				//如果所有可装备位置都不为空，则选择第一个位置装备
				if (positionToEquip === null) {
					console.log(posiblePositions)
					positionToEquip = posiblePositions.get(0)
					newState = unequip(newState, positionToEquip);
				}
			}
			//equip the gear
			return newState.setIn(['wearings', positionToEquip], gearToEquip).updateIn(['gear'], items => {
				const index = items.findIndex((item) => {
					return item.get('id') === gearToEquip.get('id');
				})
				return items.delete(index)
			})
		},
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