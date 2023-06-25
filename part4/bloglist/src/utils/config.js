require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI_LOCAL

const jwt_config = {
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  credentialsRequired: false,
}



module.exports = {
  MONGODB_URI,
  PORT,
  jwt_config,
}
