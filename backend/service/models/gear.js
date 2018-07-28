const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { itemQuality, gearType, gearPosition } = require('../common/constants')
const schema = new Schema({
    //名字
    name: String,
    //品质
    quality: {
        type: Number,
        enum: Object.values(itemQuality)
    },
    // 类型
    types: [{
        type: Number,
        enum: Object.values(gearType)
    }],
    // 对应部位
    position: [{
        type: Number,
        enum: Object.values(gearPosition)
    }],
    // 描述
    description: String,
    // 特殊效果
    effects: [],
    // 重量
    weight: Number,
    // 伤害
    damage: Number
})

module.exports = mongoose.model('Gear', schema)