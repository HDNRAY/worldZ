const gearRepository = require('../repositories/gearRepository')
const { buildFailureResponse, buildSuccessResponse, buildCatchError } = require('./responseBuilder')

const gear = {}

gear.create = (req, res) => {
    const { body } = req
    gearRepository.create(body).then(result => {
        res.send(buildSuccessResponse({
            gear: result
        }))
    }).catch(buildCatchError(res))
}

gear.update = (req, res) => {
    const { body } = req
    gearRepository.create(body).then(result => {
        res.send(buildSuccessResponse({
            gear: result
        }))
    }).catch(buildCatchError(res))
}

module.exports = gear