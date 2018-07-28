const characterRepository = require('../repositories/characterRepository')
const userRepository = require('../repositories/userRepository')
const { buildFailureResponse, buildSuccessResponse } = require('./responseBuilder')

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
    }).catch(err => {
        console.log(err)
        res.send(buildFailureResponse(1002, ''))
    })
}

controller.getCharacterById = (req, res) => {
    const { id } = req.params
}

module.exports = controller