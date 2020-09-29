/*
**************************************************
* 功能: version controller
* 作者: webB1an
**************************************************
*/
const express = require('express')
const router = express.Router()
const routes = require('../routes')

router.use('/v1', routes)

module.exports = router
