const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { gearPosition } = require('../common/constants')

const schema = new Schema({
    name: {
        type: String,
        unique: true
    },

    gender: {
        type: Number,
        required: true
    },

    attributes: {
        main: {
            blood: { type: Number, default: 5000 },
            spirit: { type: Number, default: 100 },
            experience: { type: Number, default: 0 },
        },
        basic: {
            strength: Number,
            agility: Number,
            dexterity: Number,
            stamina: Number,
            mind: Number,
            intelligence: Number,
        },
        power: {
            burnning: { type: Number, default: 0 },
            voltage: { type: Number, default: 0 },
            freeze: { type: Number, default: 0 },
            telekinetic: { type: Number, default: 0 },
        },
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