const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        required: true,
        type: String
    },

    description: String,

    requirements: [],

    duration: {
        default: 0,
        type: Number
    },

    awards: [],

    // 取消的惩罚
    publishments: [],

    prerequisites: []
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task