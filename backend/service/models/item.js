const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    itemType: {
        type: String,
        enum: ['Gear', 'Spendable']
    },

    itemAttributes: {
        quantity: Number,
    },

    object: {
        type: Schema.Types.ObjectId,
        refPath: 'itemType'
    }
})

module.exports = mongoose.model('Item', schema)