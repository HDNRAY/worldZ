const userRepository = require('../repositories/userRepository')
const { buildFailureResponse, buildSuccessResponse } = require('./responseBuilder')
const { ERROR_NO_USER } = require('./exceptions');
const controller = {}

controller.loginByUsername = (req, res) => {

    const { username } = req.body

    userRepository.findUserByUsername(username).then(result => {

        if (result) {
            res.send(buildSuccessResponse({
                user: result
            }))
        } else {
            res.send(buildFailureResponse(ERROR_NO_USER))
        }
    }).catch(err => res.send(buildCatchError(err)))

}

module.exports = controller