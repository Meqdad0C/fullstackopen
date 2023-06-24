const express = require('express')
const database = require('./module/database')
const cors = require('cors')
const morgan = require('morgan')
const blogRouter = require('./controller/blogs')

const app = express()
database.connect()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(morgan('dev'))

app.use('/api/blogs', blogRouter)

app.get('/', (req, res) => {
  res.send('<h1>Meqdad Amr</h1>')
})

module.exports = app
