const mongoose = require('mongoose')
const collections = require('./collections')


const categoriesSchema = new mongoose.Schema({
  category: {
    type: String
  }
})

const Categories = mongoose.model(collections.categories, categoriesSchema)

module.exports = Categories