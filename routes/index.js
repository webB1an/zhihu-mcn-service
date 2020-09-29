/*
**************************************************
* 功能: routes
* 作者: webB1an
**************************************************
*/
const express = require('express')
const router = express.Router()
const category = require('./category')

router.use('/category', category)

module.exports = router
