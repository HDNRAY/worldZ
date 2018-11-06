const characterRepository = require('../repositories/characterRepository')
const userRepository = require('../repositories/userRepository')
const { buildSuccessResponse, buildCatchError, buildFailureResponse } = require('./responseBuilder')
const { checkAttributes } = require('../common/util');
const { ERROR_INVALID_PARAMETER } = require('./exceptions');
const { generate } = require('../auth/auth')

const controller = {}

const characterAttributes = ['strength', 'agility', 'dexterity', 'stamina', 'mind', 'intelligence']

const attributeBaseValue = 10

controller.create = (req, res) => {
    console.log(req.body)
    if (!checkAttributes({ target: req.body, attributes: ['name', 'gender', 'attributes'] })) {
        res.send(buildFailureResponse(ERROR_INVALID_PARAMETER))
        return
    }

    const { name, attributes, gender } = req.body

    if (!checkAttributes({ target: attributes, attributes: characterAttributes })) {
        res.send(buildFailureResponse(ERROR_INVALID_PARAMETER))
        return
    }

    if (Object.keys(attributes).reduce((sum, item) => sum + attributes[item], 0) !== characterAttributes.length * attributeBaseValue) {
        res.send(buildFailureResponse(ERROR_INVALID_PARAMETER))
        return
    }

    const userId = req.cookies.userId
    const character = {
        name,
        gender,
        attributes: {
            basic: {
                ...attributes,
            },
        }
    }
    let result
    characterRepository.create(character).then(newCharacter => {
        console.log('newCharacter', newCharacter)
        result = newCharacter
        return userRepository.findbyIdAndAddCharacter(userId, newCharacter.id)
    }).then(user => {
        res.send(buildSuccessResponse({
            character: result
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

// controller.getCharacterById = (req, res) => {
//     const { id } = req.params
//     characterRepository.find(id).lean().then(result => {
//         res.send(buildSuccessResponse({
//             character: result
//         }))
//     }).catch(err => res.send(buildCatchError(err)))
// }

// controller.viewCharacterById = (req, res) => {
//     const { id } = req.params
//     characterRepository.findByIdWithGears(id).lean().then(result => {
//         res.send(buildSuccessResponse({
//             character: result
//         }))
//     }).catch(err => res.send(buildCatchError(err)))
// }

controller.loadCharacterById = (req, res) => {
    const userId = req.cookies.userId
    const { id } = req.params
    let character
    characterRepository.findByIdWithAllInfos(id).lean().then(result => {
        character = result
        return generate({ userId, characterId: result._id })
    }).then(token => {
        res.setHeader('Set-Cookie', `wztoken=${token};path=/`)
        res.send(buildSuccessResponse({
            character
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

controller.equipGear = (req, res) => {
    const characterId = req.cookies.characterId
    const { gearId, position } = req.body

    characterRepository.findByIdWithAllInfos(characterId).then(character => {
        const itemToEquip = character.inventory.find(i => i._id.toString() === gearId)
        const gearToEquip = itemToEquip.object
        const wearingsObject = character.wearings.reduce((result, wearing) => {
            result[wearing.position] = wearing.gear
            return result
        }, {})
        // 如果此装备只有一个可装备的栏位
        let positionToEquip
        if (position) {
            positionToEquip = position
        } else if (gearToEquip.position.length === 1) {
            positionToEquip = gearToEquip.position[0]
        } else {
            // 如果不止一个则遍历这些栏位是否空着，如果都不空着，则选择第一个
            positionToEquip = gearToEquip.position.find(p => !wearingsObject[p])
            if (positionToEquip === undefined) positionToEquip = gearToEquip.position[0]
        }
        wearingsObject[positionToEquip] = itemToEquip

        const newWearings = Object.keys(wearingsObject).map(key => ({
            position: key,
            gear: wearingsObject[key]._id
        }))

        return characterRepository.updateWearings(characterId, newWearings)
    }).then(result => {
        res.send(buildSuccessResponse({
            wearings: result.wearings
        }))
    }).catch(err => res.send(buildCatchError(err)))

}

controller.unequipGear = (req, res) => {
    const characterId = req.cookies.characterId
    const { position } = req.body

    characterRepository.findById(characterId).then(character => {

        const newWearings = character.wearings
        newWearings.splice(character.wearings.findIndex(w => w.position === position), 1)

        return characterRepository.updateWearings(characterId, newWearings)
    }).then(result => {
        res.send(buildSuccessResponse({
            wearings: result.wearings
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

controller.spendSpendable = (req, res) => {

}

controller.dropItem = (req, res) => {

}

module.exports = controller