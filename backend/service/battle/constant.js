
const EFFECT_TYPE = {
    DIRECT_DAMAGE: 0,
    ADD_BUFF: 1,
    CLEAR_BUFF: 2
}

const TEAM_ID = {
    PLAYER: 0,
    ENEMY: 1
}

const BATTLE_RESULT = {
    NO_RESULT: 0,
    PLAYER_WIN: 1,
    ENEMY_WIN: 2,
    ALL_LOSE: 3
}

module.exports = { EFFECT_TYPE, TEAM_ID, BATTLE_RESULT }