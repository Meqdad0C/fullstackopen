const express = require('express')
require('express-async-errors')
const database = require('./module/database')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const blogRouter = require('./controller/blogs')

const app = express()
database.connect()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('public'))

app.use('/api/blogs', blogRouter)

app.get('/', (req, res) => {
  res.send('<h1>Meqdad Amr</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
