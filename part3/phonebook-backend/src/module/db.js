const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')

const url = config.MONGODB_URI

const connect = () => {
  mongoose.set('strictQuery', false)
  mongoose
    .connect(url)
    .then((result) => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
    })
}

module.exports = { connect }
