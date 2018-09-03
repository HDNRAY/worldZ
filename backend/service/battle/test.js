const battle = require('./battle');
let state = {
    playerTeam: {
        characters: [{
            name: 'Ray',
            attributes: {
                atk_period: 15,
                attack: 5,
                health: 80
            },
            skills: {
                active: [],
                passive: []
            }
        }]
    },
    enemyTeam: {
        characters: [{
            name: '61f',
            attributes: {
                atk_period: 10,
                attack: 3,
                health: 100
            },
            skills: {
                active: [],
                passive: []
            }
        }]
    }
}

console.log(state)
battle.compute(state)