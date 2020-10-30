/*
**************************************************
* 功能: category routes
* 作者: webB1an
**************************************************
*/
const express = require('express')
const router = express.Router()
const relation = require('../controller/relation/relation')

router.post('/save', relation.save)
router.post('/list', relation.list)
router.post('/random', relation.random)

module.exports = router
