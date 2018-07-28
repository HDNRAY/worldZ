const userModal = require('../models/user')

const repository = {}

repository.findUserById = id => {
    return userModal.findById(id).populate('characters').lean()
}

repository.findUserByUsername = username => {
    return userModal.findOne({
        username
    }).lean()
}

repository.findByIdAndUpdate = (id, updates) => {
    return userModal.findByIdAndUpdate(id, updates).lean()
}

repository.findbyIdAndAddCharacter = (id, characterId) => {
    return userModal.findByIdAndUpdate(id, {
        $push: {
            characters: characterId
        }
    }, { new: true }).lean()
}

repository.create = user => {
    return userModal.create(user)
}

module.exports = repository