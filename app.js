const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config({ path: './dev.env' })

const app = express()

// parse post request
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.listen(3000, () => {
  console.log('server is running')
})
