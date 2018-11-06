const fs = require('fs')
const jwt = require('jsonwebtoken')
const { ERROR_NOT_AUTHORIZED } = require('../services/exceptions')
const { buildFailureResponse } = require('../services/responseBuilder')

let userSsecret

const getUserSecret = () => {
    return new Promise((resolve, reject) => {
        if (!userSsecret) {
            fs.readFile('config/application.json', {}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    const config = JSON.parse(data)
                    userSsecret = config.jwtSecret
                    resolve(userSsecret)
                }
            })
        } else {
            resolve(userSsecret)
        }
    })
}

module.exports = {
    userAuth: (req, res, next) => {
        const token = req.cookies.wztoken
        // console.log('token', req.cookies)
        getUserSecret().then(secret => {
            jwt.verify(token, secret, (err, result) => {
                if (err) {
                    console.log(err)
                    res.send(buildFailureResponse(ERROR_NOT_AUTHORIZED))
                } else {
                    const now = Date.now()
                    if (result.exp * 1000 < now) {
                        res.send(buildFailureResponse(ERROR_NOT_AUTHORIZED))
                    } else {
                        req.cookies = result
                        next()
                    }

                }
            })
        })
    },
    adminAuth: (req, res, next) => {
        next()
    },
    generate: (content) => {
        return getUserSecret().then(secret => {
            return jwt.sign(content, secret, {
                expiresIn: '30d'
            })
        })
    }
}