const userRepository = require('../repositories/userRepository')
const { buildFailureResponse, buildSuccessResponse, buildCatchError } = require('./responseBuilder')
const { ERROR_INVALID_PARAMETER, ERROR_INVALID_CREDENTIALS } = require('./exceptions');
const { encryptWithSalt, generateSalt } = require('../common/crypto')
const { checkAttributes } = require('../common/util')
const { generate } = require('../auth/auth')
const controller = {}

controller.loginByUsername = (req, res) => {

    const { username, password } = req.body

    if (!checkAttributes({ target: req.body, attributes: ['username', 'password'] })) {
        res.send(buildFailureResponse(ERROR_INVALID_PARAMETER))
    }
    let user
    userRepository.findUserByUsername(username).then(result => {

        if (result) {
            return encryptWithSalt(password, result.salt).then(encryptedPwd => {
                if (encryptedPwd === result.password) {
                    delete result.password
                    delete result.salt
                    user = {
                        ...result
                    }
                    console.log(result)
                    return generate(result._id)
                } else {
                    res.send(buildFailureResponse(ERROR_INVALID_CREDENTIALS))
                }
            })
        } else {
            res.send(buildFailureResponse(ERROR_INVALID_CREDENTIALS))
        }

    }).then(token => {
        console.log('in controller', token)
        // res.setHeader('wztoken', token)
        res.setHeader('Set-Cookie', `wztoken=${token};path=/`)
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
        res.send(buildSuccessResponse(user))
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