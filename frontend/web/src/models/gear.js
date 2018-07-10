import { fromJS } from 'immutable'

export default {

	namespace: 'gear',

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
			firstHand: 11,
			offHand: null,
			fingers: [],
		},
		// wearings: []
	}),

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
		},
	},

	effects: {
		* equip({ payload }, { select, put }) {
			try {
				const { gearId } = payload
				const gears = yield select(state => state.inventory.get('items').filter(item => item.get('itemType') === 'gear'))
				
				yield put({
					type: 'onEquiped',
					payload: {
						gearId,
						gears
					}
				})
			} catch (err) {
				console.log(err)
			}
		},
		* unequip({ payload }, { put }) {
			try {
				const { position } = payload

				yield put({
					type: 'onUnequiped',
					payload: {
						position
					}
				})
			} catch (err) {
				console.log(err)
			}
		},
		* switchHand({ payload }, { put }) {
			try {
				yield put({
					type: 'onSwitchedHand',
				})
			} catch (err) {
				console.log(err)
			}
		},
	},

	reducers: {
		onEquiped(state, { payload }) {
			// 按id获得装备的方法
			const getGearById = (gears, id) => gears.find(item => item.get('id') === id)

			const gearToEquip = getGearById(payload.gears, payload.gearId)
			// let positionToEquip
			let update

			// 如果是双手武器，则卸下主副手
			if (gearToEquip.get('types').includes('twoHand')) {
				update = {
					firstHand: payload.gearId,
					offHand: null
				}
			} else {
				// 如果是单手武器 且目前的主手是双手武器，则卸下, 并装备于主手
				const posiblePositions = gearToEquip.get('position')
				if (posiblePositions.includes('firstHand') || posiblePositions.includes('offHand')) {
					const gearToUnequip = getGearById(payload.gears, state.getIn(['wearings', 'firstHand']))
					if (gearToUnequip && gearToUnequip.get('types').includes('twoHand')) {
						update = {
							firstHand: payload.gearId
						}
					}
				}
			}

			// 如果不是以上情况则
			if (!update) {
				// 如果任意可装备位置为空，则选择此位置装备
				let positionToEquip = gearToEquip.get('position').find(item => {
					return state.getIn(['wearings', item]) === null
				})

				// 如果所有可装备位置都不为空，则选择第一个位置装备
				if (!positionToEquip) positionToEquip = gearToEquip.get('position').get(0)

				update = {
					[positionToEquip]: payload.gearId
				}
			}

			// 执行装备
			return state.mergeIn(['wearings'], update)
		},
		onUnequiped(state, { payload }) {
			return state.setIn(['wearings', payload.position], null)
		},
		onSwitchedHand(state, { payload }) {
			const offHand = state.getIn(['wearings', 'offHand'])
			return state.setIn(['wearings', 'offHand'], state.getIn(['wearings', 'firstHand'])).setIn(['wearings', 'firstHand'], offHand)
		}
	},
};