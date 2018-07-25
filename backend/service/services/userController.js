const userRepository = require('../repositories/userRepository')
const { buildFailureResponse, buildSuccessResponse } = require('./responseBuilder')

const controller = {}

controller.getUserById = (req, res) => {
    const { id } = req.params

    userRepository
        .findUserById(id)
        .then(result => {
            let response
            if (!result) {
                response = buildFailureResponse(1002, 'No user found')
            } else {
                response = buildSuccessResponse({
                    user: result
                })
            }
            res.send(response)
        }).catch(err => {
            console.log(err)
            res.send(buildFailureResponse(0, 'Server Error'))
        })
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
    }).catch(err => {
        console.log(err)
        res.send(buildFailureResponse(0, ''))
    })
}

module.exports = controller