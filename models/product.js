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
    type: Number,
    default: 0
  },
  url: {
    type: String,
    default: '空'
  },
  pros: {
    type: String,
    default: '空'
  },
  cons: {
    type: String,
    default: '空'
  },
  description: {
    type: String,
    default: '空'
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
