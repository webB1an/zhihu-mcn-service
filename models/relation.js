/*
**************************************************
* 功能: relation model
* 作者: webB1an
**************************************************
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const relationSchema = new Schema({
  productId: String,
  categoryId: String
})

module.exports = mongoose.model('relation', relationSchema)
