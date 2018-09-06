const { TEAM_ID, EFFECT_TYPE } = require('../constant')
const EffectDirectChange = require('../effects/effectDirectChange')

const EVENT_CHARACTER_ACTION = 'event_character_action'

class EventCharacterAction {
    constructor(character) {
        this.executor = character
        this.type = EVENT_CHARACTER_ACTION
        this.leftTime = getLeftTime(character)
    }

    getEffects(state) {
        const targetTeam = this.executor.team == TEAM_ID.PLAYER ? state.enemyTeam : state.playerTeam

        const targetChoices = targetTeam.characters
        const targetChoicesAlive = targetChoices.filter(character => character.currentStatus.health > 0)
        const action = {
            executor: this.executor,
            targets: [targetChoicesAlive[0]]
        }
        return [action].reduce((result, action) => {
            //Calculate damages and reduce the health.
            //Need to consider defense, avoidance, resistance here, in future.
            const effects = action.targets.map(target => {
                return new EffectDirectChange({
                    target,
                    attribute: 'health',
                    value: -action.executor.currentStatus.damage,
                })
            })

            return result.concat(effects)
        }, [])
    }

    timeGoesBy(time) {
        this.leftTime -= time
    }

    hasNextTurn() {
        return this.executor.currentStatus.health > 0
    }

    rebuild() {
        this.leftTime = getLeftTime(this.executor)
        return this
    }
}

const getLeftTime = character => character.currentStatus.speed

module.exports = EventCharacterAction