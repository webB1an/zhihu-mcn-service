/*
**************************************************
* 功能: category routes
* 作者: webB1an
**************************************************
*/
const express = require('express')
const router = express.Router()
const product = require('../controller/product/product')

router.post('/search', product.search)
router.post('/list', product.list)
router.post('/detail', product.detail)
router.post('/save', product.save)
router.post('/delete', product.delete)
router.post('/editor', product.editor)

module.exports = router
