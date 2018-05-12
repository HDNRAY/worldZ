import { fromJS, Map } from 'immutable';

export default {

	namespace: 'inventory',

	state: fromJS({
		wearings: {
			head: null,
			neck: null,
			shoulders: null,
			torso: null,
			wrists: null,
			hands: null,
			waist: null,
			legs: null,
			feets: null,
			twoHand: {
				name: '玄铁剑',
				quality: 'epic',
				weight: 10,
				damage: 110,
				type: '剑',
				position: 'twoHand',
				description: '重剑无锋，大巧不工',
				effects: [{
					description: ''
				}]
			},
			firstHand: null,
			offHand: null,
			fingers: [],
		},
		gear: [{
			id:2,name:'银铃胸甲',quality:'magic',type:'胸甲',position:'torso',description:'银铃胸甲，五金一件',effects:[],weight:3
		},{ 
			id: 0, name: '光之剑', quality: 'legend', type: '剑', position: 'twoHand', description: 'Gorn Nova', damage: 100, weight: 1.5, effects: [{ description: '可对灵体造成伤害' }, { description: '可附着魔法，提高斩击威力' }] }
		],
		spendable: [{ id: 0, name: '面包', quantity: 5, quality: 'normal' }]
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
		unequip(state,{payload}){
			const gear = Map(payload.gear);
			return state.updateIn(['gear'],items=>{
				return items.push(gear)
			}).setIn(['wearings',gear.get('position')],null)
		},
		equip(state,{payload}){
			const gear = Map(payload.gear);

			//get all gears to be unequiped
			const gearToUnEquip = state.getIn(['wearings',gear.get('position')]);


			//add those gears to inventory
			let newState
			if(!!gearToUnEquip){
				newState = state.updateIn(['gear'],items=>{
					return items.push(gearToUnEquip);
				})
			}else{
				newState = state;
			}

			//remove them from wearings


			//equip the gear
			return newState.setIn(['wearings',gear.get('position')],gear).updateIn(['gear'],items=>{
				const index = items.findIndex((item) => {
					return item.get('id') === gear.get('id');
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
			return state.updateIn([type], (items) => {
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