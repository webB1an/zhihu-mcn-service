const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config({ path: './dev.env' })

const app = express()

console.log('==================================')
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('PORT', process.env.PORT)
console.log('MONGODB_URL', process.env.MONGODB_URL)
console.log('==================================')

// parse post request
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${process.env.PORT}`)
})
