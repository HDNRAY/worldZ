const battle = require('./battle')

let state = {
    playerTeam: {
        characters: [{
            name: 'Ray',
            attributes: {
                health: 100,
                strength: 13,
                agility: 8,
                stamina: 9,
            },
            skills:[{
                name:'',
                targetTeam:[],
                targetCount:[1]
            }]
        }]
    },
    enemyTeam: {
        characters: [{
            name: '61f',
            attributes: {
                health: 80,
                strength: 8,
                agility: 12,
                stamina: 10,
            },
        }]
    }
}

console.log(state)
battle.compute(state)