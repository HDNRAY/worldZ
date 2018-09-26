const userRepository = require('../repositories/userRepository')
const { buildFailureResponse, buildSuccessResponse, buildCatchError } = require('./responseBuilder')
const { ERROR_NO_USER } = require('./exceptions');
const controller = {}

controller.getUserById = (req, res) => {
    const { id } = req.params

    userRepository
        .findUserById(id)
        .then(result => {
            let response
            if (!result) {
                response = buildFailureResponse(ERROR_NO_USER)
            } else {
                response = buildSuccessResponse({
                    user: result
                })
            }
            res.send(response)
        }).catch(err => res.send(buildCatchError(err)))
}

controller.create = (req, res) => {
    const { username } = req.body

    const user = {
        username
    }

    userRepository.create(user).then(result => {
        res.send(buildSuccessResponse({
            user: result
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

module.exports = controller