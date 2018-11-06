const userRepository = require('../repositories/userRepository')
const { buildFailureResponse, buildSuccessResponse, buildCatchError } = require('./responseBuilder')
const { ERROR_NO_USER } = require('./exceptions');
// const { generateSalt, encryptWithSalt } = require('../common/crypto')
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

controller.getUserInfo = (req, res) => {
    const id = req.cookies.userId

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

controller.getAllCharacters = (req, res) => {
    const userId = req.cookies.userId

    userRepository
        .findUserById(userId)
        .then(result => {
            let response
            if (!result) {
                response = buildFailureResponse(ERROR_NO_USER)
            } else {
                response = buildSuccessResponse({
                    characters: result.characters
                })
            }
            res.send(response)
        }).catch(err => res.send(buildCatchError(err)))
}

module.exports = controller