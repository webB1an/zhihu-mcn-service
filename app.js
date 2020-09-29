/*
**************************************************
* 功能: project entrance
* 作者: webB1an
**************************************************
*/
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const chalk = require('chalk')

dotenv.config({ path: './dev.env' })

const app = express()

console.log('====================================================================')
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('PORT', process.env.PORT)
console.log('MONGODB_URL', process.env.MONGODB_URL)
console.log('====================================================================')

require('./db/mongodb')

// parse post request
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

const router = require('./version/v1')
app.use(router)

app.listen(process.env.PORT, () => {
  console.log(chalk.green(`Server is running at port: ${process.env.PORT}`))
})
