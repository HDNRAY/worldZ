const crypto = require('crypto')

module.exports = {
    generateSalt: () => {
        return Math.random().toFixed(15)
    },
    encryptWithSalt: (password, salt) => {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, 1000, 16, 'sha512', (err, key) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(key.toString('hex'))
                }
            })
        })
    }
}