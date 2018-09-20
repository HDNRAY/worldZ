// const EffectDirectChange = require('../effects/effectDirectChange')
const { TARGET_TYPE } = require('../constant')

const EVENT_CHARACTER_ACTION = 'event_character_action'

class EventCharacterAction {
    constructor(character) {
        this.executor = character
        this.type = EVENT_CHARACTER_ACTION
        this.leftTime = getLeftTime(character)
        this.currentSkillId = 0
    }

    getEffects(state) {

        const skill = this.executor.skills[this.currentSkillId]
        this.currentSkillId++
        if (this.currentSkillId > this.executor.skills.length - 1) this.currentSkillId = 0

        return skill.effects.reduce((result, action) => {
            let targets = [], teamCondition = false
            switch (action.targetType) {
                case TARGET_TYPE.OPPONENT:
                    if (!teamCondition) teamCondition = character => character.team !== this.executor.team
                case TARGET_TYPE.ALLY:
                    if (!teamCondition) teamCondition = character => character.team === this.executor.team
                case TARGET_TYPE.ALL:
                    if (!teamCondition) teamCondition = () => true
                    const targetChoicesAlive = state.characters.filter(character => character.currentStatus.health > 0 && teamCondition(character))
                    targetChoicesAlive.sort(() => Math.random() - 0.5)
                    targets = targetChoicesAlive.slice(0, action.targetCount)
                    break
                case TARGET_TYPE.SELF:
                    targets = [this.executor]
                    break
            }

            const effects = targets.map(target => {
                return new action.effectType({
                    target,
                    attribute: action.effectAttribute,
                    value: -action.valueFormula(this.executor.currentStatus, target.currentStatus),
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