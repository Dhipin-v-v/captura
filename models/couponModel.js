const mongoose = require('mongoose')
const collections = require('../models/collections')

const couponSchema = new mongoose.Schema({
    code:{
        type: String
    },
    discount:{
        type: Number
    }
})

const Coupon = mongoose.model(collections.coupon, couponSchema)

module.exports = Coupon