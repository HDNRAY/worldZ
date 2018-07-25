const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: String,

    quantity: Number 
})

module.exports = model('Item', schema)