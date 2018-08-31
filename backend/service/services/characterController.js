const characterRepository = require('../repositories/characterRepository')
const userRepository = require('../repositories/userRepository')
const { buildFailureResponse, buildSuccessResponse, buildCatchError } = require('./responseBuilder')

const controller = {}

controller.create = (req, res) => {
    const userId = req.params.id
    const { name } = req.body

    const character = {
        name,
        attributes: {
            spirit: 10,
            strength: 10,
            agility: 10,
            dexterity: 10,
            stamina: 10,
            mind: 10,
            experience: 10,
            intelligence: 10,
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
    }).catch(buildCatchError(res))
}

controller.getCharacterById = (req, res) => {
    const { id } = req.params
    characterRepository.findById(id).lean().then(result => {
        res.send(buildSuccessResponse({
            character: result
        }))
    }).catch(buildCatchError(res))
}

controller.viewCharacterById = (req, res) => {
    const { id } = req.params
    characterRepository.findByIdWithGears(id).lean().then(result => {
        res.send(buildSuccessResponse({
            character: result
        }))
    }).catch(buildCatchError(res))
}

controller.loadCharacterById = (req, res) => {
    const { id } = req.params
    characterRepository.findByIdWithAllInfos(id).lean().then(result => {
        res.send(buildSuccessResponse({
            character: result
        }))
    }).catch(buildCatchError(res))
}

module.exports = controller