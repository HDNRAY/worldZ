const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

    gears: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],

    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
})

module.exports = mongoose.model('Character', schema)