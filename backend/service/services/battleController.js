const { checkAttributes } = require('../common/util');
const { findByIdsWithAllInfos } = require('../repositories/characterRepository');
const { TEAM_ID } = require('../battle/constant');
const { buildFailureResponse, buildSuccessResponse, buildCatchError } = require('./responseBuilder')
const controller = {}

controller.battleWithOther = (req, res) => {
    if (!checkAttributes({ target: req.body, attributes: ['players', 'enemies'] })) {
        buildFailureResponse(ERROR_INVALID_PARAMETER)
    }
    const { players, enemies } = req.body

    findByIdsWithAllInfos(players.concat(enemies)).then(characters => {
        characters.forEach(character => {
            if (players.includes(character.id)) {
                character.team = TEAM_ID.PLAYER
            } else if (enemies.includes(character.id)) {
                character.team = TEAM_ID.ENEMY
            }
        })
        
    })
}

module.exports = controller