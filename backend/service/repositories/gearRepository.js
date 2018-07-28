const gearModal = require('../models/gear')

const repository = {}

repository.create = gear =>{
    return gearModal.create(gear)
}

repository.findGearById = id =>{
    return gearModal.findById(id).lean()
}

module.exports = repository