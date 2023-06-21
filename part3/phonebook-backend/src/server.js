import express from "express"
import morgan from "morgan"
import crypto from "crypto"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan('dev'))
app.use(
  morgan(':body', {
    skip: (req, res) => {
      return !(req.method === 'PUT' || req.method === 'POST');
    },
  })
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get("/", (req, res) => {
  res.send("<h1>Meqdad</h1>")
})

app.get("/api/persons", (req, res) => {
  res.json(persons)
})
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)

  const requestedPerson = persons.find((p) => p.id === id)

  if (!requestedPerson) {
    return res.status(404).send("<h1>User Not Found</h1>")
  }

  console.log(requestedPerson)
  res.json(requestedPerson)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  console.log(`Deleting use with id ${id}`)
  persons = persons.filter((p) => p.id !== id)

  res.status(204).end()
})

app.post("/api/persons", (req, res) => {
  const name = req.body.name
  const number = req.body.number

  if (!name || !number) {
    const missing = name ? "Number" : "Name"
    return res.status(400).json({ error: `${missing} must be provided` })
  }
  if (persons.find((p) => name === p.name)) {
    return res.status(400).json({ error: "name must be unique" })
  }
  const id = crypto.randomUUID()
  const newPerson = { id, name, number }
  persons.push(newPerson)

  res.json(newPerson)
})

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} 
      people <br/> ${new Date().toString()}</p>`
  )
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

export default app
