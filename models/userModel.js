const mongoose = require('mongoose')
const collections = require('./collections')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        // unique: true
    },
    mobile: {
        type: Number,
        required: true
        // unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
             ref: "products"
        },
        quantity: {
            type: Number
        },
        pricePerItem:{
            type: Number,
            default: 0
        }
    }],

    wishlist: [{
        product:{
            type: mongoose.Schema.Types.ObjectId, ref: "products"
        }
    }],

    address: [{
        name:{
            type: String
        },
        house:{
            type: String
        },
        locality:{
            type: String
        },
        area:{
            type: String
        },
        landmark:{
            type: String
        },
        pincode:{
            type: Number
        }
    }]
})

//Model
const User = mongoose.model(collections.users, userSchema)

module.exports = User