const userModal = require('../models/user')

const repository = {}

repository.findUserById = id => {
    return userModal.findById(id).lean()
}

repository.findUserByUsername = username => {
    return userModal.findOne({
        username
    }).lean()
}

repository.create = user => {
    return userModal.create(user)
}

module.exports = repository