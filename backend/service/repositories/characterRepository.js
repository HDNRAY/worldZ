const characterModal = require('../models/character')

const repository = {}

repository.create = character => {
    return characterModal.create(character)
}

repository.findById = id  => {
    return characterModal.findById(id).lean()
}

repository.findByIdWithItem = id =>{
    return characterModal.findById(id).populate('items').lean()
}


module.exports = repository