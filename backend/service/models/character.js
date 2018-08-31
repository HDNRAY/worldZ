const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { gearPosition } = require('../common/constants')

const schema = new Schema({
    name: {
        type: String,
        unique: true
    },

    attribute: {
        spirit: Number,
        strength: Number,
        agility: Number,
        dexterity: Number,
        stamina: Number,
        mind: Number,
        experience: Number,
        intelligence: Number,
    },

    wearings: [{
        position: {
            type: Number,
            enum: Object.values(gearPosition)
        },
        gear: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    }],

    inventory: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
})

module.exports = mongoose.model('Character', schema)