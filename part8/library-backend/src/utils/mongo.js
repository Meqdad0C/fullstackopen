const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URI = process.env.MONGO_URI_LOCAL
const db = () => {
  mongoose.set('strictQuery', false)
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })
  mongoose.set('debug', true);
}

module.exports = db
