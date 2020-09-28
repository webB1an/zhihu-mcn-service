/*
**************************************************
* 功能: product model
* 作者: webB1an
**************************************************
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const productSchema = new Schema({
  id: {
    type: String,
    default: shortid.generate,
    index: true
  },
  name: {
    type: String,
    default: ''
  },
  price: {
    type: String,
    default: ''
  },
  pros: {
    type: String,
    default: ''
  },
  cons: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  createTime: {
    type: Number,
    default: Date.now
  },
  updateTime: {
    type: Number,
    default: Date.now
  }
})

module.exports = mongoose.model('product', productSchema)
