const fs = require('fs')

let secret

const getSecret = () => {
    return new Promise((resolve, reject) => {
        if (!secret) {
            fs.readFile('config/application.json', {}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    const config = JSON.parse(data)
                    secret = config.jwtSecret
                    resolve(secret)
                }
            })
        } else {
            resolve(secret)
        }
    })
}

const generate = (userId) => {

}

module.exports = {
    userAuth: (req, res, next) => {
        next()
    },
    adminAuth: (req, res, next) => {
        next()
    }
}