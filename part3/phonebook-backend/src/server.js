import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import cors from 'cors'
import Person from './models/person.js'

const app = express()
app.use(express.json())
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan('dev'))
app.use(
  morgan(':body', {
    skip: (req, res) => {
      return !(req.method === 'PUT' || req.method === 'POST')
    },
  })
)

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.send('<h1>Meqdad</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((p) => (p ? res.json(p) : res.status(404).end()))
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res,next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number

  if (!name || !number) {
    const missing = name ? 'Number' : 'Name'
    return res.status(400).json({ error: `${missing} must be provided` })
  }

  const person_to_add = new Person({
    name,
    number,
  })

  person_to_add
    .save()
    .then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      res.json(result)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  const person = { name, number }
  /** Notice that the findByIdAndUpdate method receives a regular JavaScript object as its parameter,
   *  and not a new note object created with the Note constructor function. */
  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      return res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.get('/info', async (req, res) => {
  const count = await Person.find({}).then((respons) => respons.length)
  res.send(
    `<p>Phonebook has info for ${count} people <br/> ${new Date().toString()}</p>`
  )
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
