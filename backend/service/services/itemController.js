const itemRepository = require('../repositories/itemRepository')
const characterRepository = require('../repositories/characterRepository')
const { buildSuccessResponse, buildCatchError } = require('./responseBuilder')
const { itemType } = require('../common/constants')

const item = {}

item.createToCharacter = (req, res) => {
    const characterId = req.params.character
    const type = req.params.type
    const { objectId } = req.body
    itemRepository.create({
        itemType: type,
        itemAttributes: {},
        object: objectId
    }).then(item => {
        return characterRepository.addItem(characterId, item._id)
    }).then(result => {
        res.send(buildSuccessResponse({
            inventory: result.inventory
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

module.exports = item