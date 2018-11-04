const characterRepository = require('../repositories/characterRepository')
const userRepository = require('../repositories/userRepository')
const { buildSuccessResponse, buildCatchError, buildFailureResponse } = require('./responseBuilder')
const { checkAttributes } = require('../common/util');
const { ERROR_INVALID_PARAMETER } = require('./exceptions');

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

    const userId = req.user.id
    const character = {
        name,
        gender,
        attributes: {
            ...attributes,
            spirit: 100,
            experience: 0
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

controller.getCharacterById = (req, res) => {
    const { id } = req.params
    characterRepository.findById(id).lean().then(result => {
        res.send(buildSuccessResponse({
            character: result
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

controller.viewCharacterById = (req, res) => {
    const { id } = req.params
    characterRepository.findByIdWithGears(id).lean().then(result => {
        res.send(buildSuccessResponse({
            character: result
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

controller.loadCharacterById = (req, res) => {
    const { id } = req.params
    characterRepository.findByIdWithAllInfos(id).lean().then(result => {
        res.send(buildSuccessResponse({
            character: result
        }))
    }).catch(err => res.send(buildCatchError(err)))
}

module.exports = controller