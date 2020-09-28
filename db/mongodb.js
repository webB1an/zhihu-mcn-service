const mongoose = require('mongoose')
const chalk = require('chalk')

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  authSource: 'admin'
})

const db = mongoose.connection

db.once('open', () => {
  console.log(chalk.green('db is connect!'))
})

db.on('error', error => {
  console.log(chalk.red(error))
})

db.on('close', () => {
  console.log(chalk.red('db is closed!'))
})

module.exports = mongoose
