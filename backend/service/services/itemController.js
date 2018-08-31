const itemRepository = require('../repositories/itemRepository')
const { buildFailureResponse, buildSuccessResponse, buildCatchError } = require('./responseBuilder')

const item = {}

item.createGearItemByBuy = (req, res) => {
    const userId = req.params.id
    const { gearId } = req
    itemRepository.create(body).then(result => {
        res.send(buildSuccessResponse({
            item: result
        }))
    }).catch(buildCatchError(res))
}

item.update = (req, res) => {
    const { body } = req
    itemRepository.create(body).then(result => {
        res.send(buildSuccessResponse({
            item: result
        }))
    }).catch(buildCatchError(res))
}

module.exports = item