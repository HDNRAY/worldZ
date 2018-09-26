const itemRepository = require('../repositories/itemRepository')
const characterRepository = require('../repositories/characterRepository')
const { buildSuccessResponse, buildCatchError } = require('./responseBuilder')
const { itemType } = require('../common/constants')

const item = {}

item.createGearItemByBuy = (req, res) => {
    const characterId = req.params.id
    const { gearId } = req
    itemRepository.create({
        itemType: itemType.GEAR,
        itemAttributes: {},
        object: gearId
    }).then(item => {
        return characterRepository.addItem(characterId, item.Id)
    }).then(result => {
        res.send(buildSuccessResponse({
            item: result
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

item.update = (req, res) => {
    const { body } = req
    itemRepository.create(body).then(result => {
        res.send(buildSuccessResponse({
            item: result
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

module.exports = item