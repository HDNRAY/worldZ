const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        isRquired: true
    },

    characters: [{
        type: Schema.Types.ObjectId,
        ref: 'Character'
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User