const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { itemQuality } = require('../common/constants')
const schema = new Schema({
    //名字
    name: String,
    //品质
    quality: {
        type: Number,
        enum: Object.values(itemQuality)
    },
    // 描述
    description: String,
    // 特殊效果
    effects: [],
    // 重量
    weight: Number,
})

module.exports = mongoose.model('Spendable', schema)