import Mock from 'mockjs';


export default {

	'GET /api/map': (req, res) => {
		console.log('GET /api/map')
		let data = Mock.mock({
			id: 0,
			name: '世界',
			path: '/',
			terrain: [],
			objects: null,
			children: [{
				id: 1,
				position: { x: 10, y: 10 },
				name: '中土',
				path: '/central',
				terrain: [],
				objects: null,
				children: []
			}, {
				id: 2,
				position: { x: 10, y: 10 },
				name: '中原',
				path: '/central',
				terrain: [],
				objects: null,
				children: [{
					id: 3,
					position: { x: 10, y: 10 },
					name: '荆州',
					path: '/central',
					terrain: [],
					objects: null,
					children: [{
						id: 4,
						position: { x: 10, y: 10 },
						name: '汉口',
						path: '/hankou',
						terrain: [],
						objects: null,
						children: [{
							id: 5,
							position: { x: 10, y: 10 },
							name: '牛家村',
							path: '/niujiacun',
							terrain: [],
							objects: [{
								position: { x: 10, y: 10 },
								name: '牌坊',
								description: '一座木制的古旧的牌坊，写着【牛家村】'
							}],
							npcs: [{
								name: '小明',
								description: '一个小孩'
							}],
							children: [{
								id: 6,
								position: { x: 10, y: 10 },
								name: '杨家',
								path: '/yangjia',
								terrain: [],
								objects: [],
								children: [],
							}, {
								id: 8,
								position: { x: 50, y: 30 },
								name: '郭家',
								path: '/guojia',
								terrain: [],
								objects: [],
								children: [],
							}],
						}],
					}],
				}, {
					id: 7,
					position: { x: 10, y: 10 },
					name: '墨尔本',
					path: '/melbourne',
					terrain: [],
					objects: null,
					children: []
				}],
			}],

		})

		res.json(data);
	}
};