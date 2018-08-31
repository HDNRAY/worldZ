const itemModal = require('../models/item')

const repository = {}

repository.create = item => {
    return itemModal.create(item)
}

repository.updateById = (id, item) => {
    return itemModal.findByIdAndUpdate(id, item, { new: true }).lean()
}

repository.finditemById = id => {
    return itemModal.findById(id).lean()
}

repository.removeById = id =>{
    return itemModal.findByIdAndRemove(id)
}

module.exports = repository