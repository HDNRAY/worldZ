const userRepository = require('../repositories/userRepository')
const { buildFailureResponse, buildSuccessResponse } = require('./responseBuilder')

const controller = {}

controller.loginByUsername = (req, res) => {

    const { username } = req.body

    userRepository.findUserByUsername(username).then(result => {

        if (result) {
            res.send(buildSuccessResponse({
                user: result
            }))
        } else {
            res.send(buildFailureResponse(1001, 'No user found'))
        }
    }).catch(err => {
        res.send(buildFailureResponse(err))
    })

}

module.exports = controller