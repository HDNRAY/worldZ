const characterRepository = require('../repositories/characterRepository')
const userRepository = require('../repositories/userRepository')
const { buildSuccessResponse, buildCatchError } = require('./responseBuilder')
const { checkAttributes } = require('../common/util');
const { ERROR_INVALID_PARAMETER } = require('./exceptions');

const controller = {}

const characterAttributes = ['spirit', 'strength', 'agility', 'dexterity', 'stamina', 'mind', 'intelligence']

const attributeBaseValue = 10

controller.create = (req, res) => {
    
    if (!checkAttributes({ target: req.body, attributes: ['name', 'attributes'] })) {
        res.send(buildFailureResponse(ERROR_INVALID_PARAMETER))
    }

    const { name, attributes } = req.body

    if (!checkAttributes({ target: attributes, attributes: characterAttributes })) {
        res.send(buildFailureResponse(ERROR_INVALID_PARAMETER))
    }

    if (characterAttributes.reduce((sum, item) => sum + item, 0) !== characterAttributes.length * attributeBaseValue) {
        res.send(buildFailureResponse(ERROR_INVALID_PARAMETER))
    }

    const userId = req.params.id
    const character = {
        name,
        attributes: {
            ...attributes,
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