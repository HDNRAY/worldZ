const gearModal = require('../models/gear')

const repository = {}

repository.create = gear => {
    return gearModal.create(gear)
}

repository.update = (id, gear) => {
    return gearModal.findByIdAndUpdate(id, gear, { new: true }).lean()
}

repository.findGearById = id => {
    return gearModal.findById(id).lean()
}

module.exports = repository