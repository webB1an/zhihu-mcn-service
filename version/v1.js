/*
**************************************************
* 功能: version controller
* 作者: webB1an
**************************************************
*/
const express = require('express')
const router = express.Router()

const category = require('../routes/category')
const product = require('../routes/product')
const relation = require('../routes/relation')

router.use('/category', category)
router.use('/product', product)
router.use('/relation', relation)

module.exports = router
