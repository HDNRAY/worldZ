const battle = require('./battle')
const { TARGET_TYPE } = require('./constant')
const EffectDirectChange = require('./effects/effectDirectChange')

let state = {
    characters: [{
        name: 'Ray',
        team: 0,
        attributes: {
            health: 100,
            strength: 13,
            agility: 8,
            stamina: 9,
        },
        skills: [{
            name: '平砍',
            effects: [{
                targetType: TARGET_TYPE.OPPONENT,
                targetCount: 1,
                effectType: EffectDirectChange,
                valueFormula: selfStatus => selfStatus.damage,
                effectAttribute: 'health'
            }]
        }]
    }, {
        name: '61f',
        team: 1,
        attributes: {
            health: 80,
            strength: 8,
            agility: 12,
            stamina: 10,
        },
        skills: [{
            name: '平砍',
            effects: [{
                targetType: TARGET_TYPE.OPPONENT,
                targetCount: 1,
                effectType: EffectDirectChange,
                valueFormula: selfStatus => selfStatus.damage,
                effectAttribute: 'health'
            }]
        }]
    }]
}

console.log(state)
battle.compute(state)