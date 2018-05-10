import Mock from 'mockjs';


export default {

	'GET /api/map': (req, res) => {
		console.log('GET /api/map')
		let data = Mock.mock({
			id: 0,
			name: '世界',
			terrain: [],
			objects: [],
			npcs: [],
			children: [{
				id: 1,
				position: { x: 10, y: 10 },
				name: '中土',
				terrain: [],
				objects: [],
				npcs: [],
				children: []
			}, {
				id: 2,
				position: { x: 10, y: 10 },
				name: '中原',
				terrain: [],
				objects: [],
				npcs: [],
				children: [{
					id: 3,
					position: { x: 10, y: 10 },
					name: '荆州',
					terrain: [],
					objects: [],
					npcs: [],
					children: [{
						id: 4,
						position: { x: 10, y: 10 },
						name: '汉口',
						terrain: [],
						objects: [],
						npcs: [],
						children: [{
							id: 5,
							position: { x: 10, y: 10 },
							name: '牛家村',
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
								terrain: [],
								objects: [],
								npcs: [{
									name: '杨过',
									description: '独臂长衫，背负一把通体深黑的大剑'
								}],
								children: [],
							}, {
								id: 8,
								position: { x: 50, y: 30 },
								name: '郭家',
								terrain: [],
								objects: [],
								npcs: [],
								children: [],
							}],
						}],
					}],
				}, {
					id: 7,
					position: { x: 10, y: 10 },
					name: '墨尔本',
					terrain: [],
					objects: [],
					npcs: [],
					children: []
				}],
			}],

		})

		res.json(data);
	}
};