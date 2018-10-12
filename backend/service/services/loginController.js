const userRepository = require('../repositories/userRepository')
const { buildFailureResponse, buildSuccessResponse, buildCatchError } = require('./responseBuilder')
const { ERROR_INVALID_PARAMETER, ERROR_INVALID_CREDENTIALS } = require('./exceptions');
const { encryptWithSalt, generateSalt } = require('../common/crypto')
const { checkAttributes } = require('../common/util')
const controller = {}

controller.loginByUsername = (req, res) => {

    const { username, password } = req.body

    if (!checkAttributes({ target: req.body, attributes: ['username', 'password'] })) {
        res.send(buildFailureResponse(ERROR_INVALID_PARAMETER))
    }

    userRepository.findUserByUsername(username).then(result => {

        if (result) {
            encryptWithSalt(password, result.salt).then(encryptedPwd => {
                if (encryptedPwd === result.password) {
                    delete result.password
                    delete result.salt
                    res.send(buildSuccessResponse({
                        user: result
                    }))
                } else {
                    res.send(buildFailureResponse(ERROR_INVALID_CREDENTIALS))
                }
            })
        } else {
            res.send(buildFailureResponse(ERROR_INVALID_CREDENTIALS))
        }

    }).catch(err => res.send(buildCatchError(err)))
}

controller.registerWithUsername = (req, res) => {

    const { username, password } = req.body

    if (!checkAttributes({ target: req.body, attributes: ['username', 'password'] })) {
        res.send(buildFailureResponse(ERROR_INVALID_PARAMETER))
    }

    const salt = generateSalt()

    encryptWithSalt(password, salt).then(encryptedPassword => {
        const user = {
            username,
            salt,
            password: encryptedPassword
        }
        return userRepository.create(user)
    }).then(result => {
        res.send(buildSuccessResponse({
            user: result
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

module.exports = controller