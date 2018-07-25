const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: String,

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

    gears:{
        
    },

    items:[{
        type:Schema.Types.ObjectId,
        ref:'Item'
    }]
})

module.exports = model('Character', schema)