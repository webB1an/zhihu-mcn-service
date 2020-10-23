/*
**************************************************
* 功能: category routes
* 作者: webB1an
**************************************************
*/
const express = require('express')
const router = express.Router()
const category = require('../controller/category/category')

router.post('/search', category.search)
router.post('/list', category.list)
router.post('/detail', category.detail)
router.post('/save', category.save)
router.post('/editor', category.editor)

module.exports = router
