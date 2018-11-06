const characterModal = require('../models/character')

const repository = {}

repository.create = character => {
    return characterModal.create(character)
}

repository.findById = id => {
    return characterModal.findById(id)
}

// repository.findByIdWithGears = id => {
//     return characterModal.findById(id).populate('wearings.gear')
// }

repository.findByIdWithAllInfos = id => {
    return characterModal.findById(id).populate({
        path: 'wearings inventory',
        populate: {
            path: 'object'
        }
    })
}

repository.findByIdsWithAllInfos = ids => {
    return characterModal.where('id').in(ids).populate('inventory').exec()
}

repository.addItem = (id, itemId) => {
    return characterModal.findByIdAndUpdate(id, {
        $push: {
            inventory: itemId
        }
    }, {
            new: true
        }).populate('inventory')
}

repository.updateWearings = (id, wearings) => {
    return characterModal.findByIdAndUpdate(id, {
        wearings: wearings
    }, {
            new: true,
            upsert: true
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