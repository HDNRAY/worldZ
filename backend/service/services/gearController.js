const gearRepository = require('../repositories/gearRepository')
const { buildSuccessResponse, buildCatchError } = require('./responseBuilder')

const gear = {}

gear.create = (req, res) => {
    const { body } = req
    gearRepository.create(body).then(result => {
        res.send(buildSuccessResponse({
            gear: result
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

gear.update = (req, res) => {
    const { body } = req
    gearRepository.create(body).then(result => {
        res.send(buildSuccessResponse({
            gear: result
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

module.exports = gear