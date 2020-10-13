/*
**************************************************
* 功能: version controller
* 作者: webB1an
**************************************************
*/
const express = require('express')
const router = express.Router()

const category = require('../routes/category')

router.use('/category', category)

module.exports = router
