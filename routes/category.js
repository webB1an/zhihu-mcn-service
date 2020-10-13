/*
**************************************************
* 功能: category routes
* 作者: webB1an
**************************************************
*/
const express = require('express')
const router = express.Router()
const category = require('../controller/category/category')

router.post('/save', category.save)

module.exports = router
