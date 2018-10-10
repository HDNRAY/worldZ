const characterModal = require('../models/character')

const repository = {}

repository.create = character => {
    return characterModal.create(character)
}

repository.findById = id => {
    return characterModal.findById(id)
}

repository.findByIdWithGears = id => {
    return characterModal.findById(id).populate('gears')
}

repository.findByIdWithAllInfos = id => {
    return characterModal.findById(id).populate('wearings inventory')
}

repository.findByIdsWithAllInfos = ids => {
    return characterModal.where('id').in(ids).populate('wearings inventory').exec()
}

repository.addItem = (id, itemId) => {
    return characterModal.findByIdAndUpdate(id, {
        $push: {
            inventory: itemId
        }
    }, {
        new: true
    })
}

// 穿/脱装备
repository.updateGearByPosition = (id, itemId, position) => {
    const data = itemId ? {
        position,
        gear: itemId
    } : null

    return characterModal.findOneAndUpdate({
        id,
        wearings: {
            $elemMatch: {
                position
            }
        }
    }, {
        $set: {
            "wearings.$": data
        }
    }, {
        new: true
    })
}

module.exports = repository