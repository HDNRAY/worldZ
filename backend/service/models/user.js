const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },

    salt: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    characters: [{
        type: Schema.Types.ObjectId,
        ref: 'Character'
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User