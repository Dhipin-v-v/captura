const mongoose = require('mongoose')
const collections = require('./collections')

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'User must have a name']
    },
    email:{
        type: String,
        required: [true,'User must have an email ID'],
        // unique: true
    },
    mobile:{
        type: Number,
        required: [true,'User must have mobile'],
        // unique: true
    },
    password:{
        type: String,
        required: [true,'Password is mandatory']
    }
})

const Admin = mongoose.model(collections.admin,adminSchema)

module.exports = Admin