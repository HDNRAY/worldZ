const battle = require('./battle');
let state = {
	characters: [{
		name: 'Ray',
		attributes: {
			atk_period: 15,
			attack: 5,
			health: 20
		},
		skills: {
			active: [],
			passive: []
		},
		team: 0,
		alive: 1
	}, {
		name: '61f',
		attributes: {
			atk_period: 10,
			attack: 3,
			health: 20
		},
		skills: {
			active: [],
			passive: []
		},
		team: 1,
		alive: 1
	}]
}

console.log(state)
battle.compute(state)