const Person = require('../models/person')
const peopleRouter = require('express').Router()

peopleRouter.get('/', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

peopleRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((p) => (p ? res.json(p) : res.status(404).end()))
    .catch((error) => next(error))
})

peopleRouter.post('/', (req, res, next) => {
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
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

peopleRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((deletedPerson) => res.status(204).end())
    .catch((error) => next(error))
})

peopleRouter.put('/:id', (req, res, next) => {
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

const getInfo = async (req, res) => {
  const count = await Person.find({}).then((respons) => respons.length)
  res.send(
    `<p>Phonebook has info for ${count} people <br/> ${new Date().toString()}</p>`
  )
}

module.exports = { peopleRouter, getInfo }
