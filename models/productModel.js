const mongoose = require('mongoose')
const collections = require('./collections')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId, ref:"categories",
        required: true
    },

    actual: {
        type: Number,
        required: true
    },

    selling: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    images: {
        type: Array
    },

    active:{
        type: Boolean,
        default: true
    }
})

const Products = mongoose.model(collections.products,productSchema)

module.exports = Products