const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { itemType } = require('../common/constants')

const schema = new Schema({
    itemType: {
        type: String,
        enum: Object.values(itemType)
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