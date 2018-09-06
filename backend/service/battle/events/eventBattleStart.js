const EVENT_BATTLE_START = 'event_battle_start'

class EventBattleStart {
    constructor() {
        this.type = EVENT_BATTLE_START
        this.leftTime = 0
    }

    getEffects() {
        return []
    }

    hasNextTurn() {
        return false
    }

    // never called
    timeGoesBy() {
    }

    // never called
    rebuild() {
        return null
    }
}

module.exports = EventBattleStart