const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { peopleRouter, getInfo } = require('./controller/people')
const middleware = require('./utils/middleware')
const db = require('./module/db')

const app = express()
db.connect()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('dev'))

app.use('/api/persons', peopleRouter)
app.get('/info', getInfo)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
