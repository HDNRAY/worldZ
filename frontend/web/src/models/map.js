// import * as mapService from '../services/map';

export default {

	namespace: 'map',

	state: {
		mapTree: null,
		currentMaps: null,
	},

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
			history.listen(location => {
				console.log('location', location);
				if (location.pathname.includes('game')) {
					dispatch({
						type: 'get'
					})
				}

			})
		},
	},

	effects: {
		// * get({ payload }, { call, put }) { // eslint-disable-line
		// 	const data = yield call(mapService.init);
		// 	yield put({
		// 		type: 'save',
		// 		payload: {
		// 			map: data
		// 		}
		// 	});
		// },
	},

	reducers: {
		change(state, { payload }) {

			const newMapId = state.currentMaps.findIndex((item) => {
				return item.id === payload.map.id
			})
			let newMaps = [];
			if (newMapId > -1) {
				newMaps = state.currentMaps.slice(0, newMapId + 1)
			} else {
				newMaps = [...state.currentMaps, payload.map]
			}

			return {
				...state,
				currentMaps: newMaps
			}
		},
		save(state, { payload }) {
			console.log(payload.map)
			return { ...state,
				mapTree: payload.map.data,
				currentMaps: [payload.map.data]
			};
		},
	},

};