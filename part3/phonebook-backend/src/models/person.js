import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
console.log(url);
mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
const Person = mongoose.model('Person', personSchema)

export default Person
/* if (process.argv.length === 4) {
  const person = new Person({
    name: `${process.argv[2]}`,
    number: `${process.argv[3]}`,
  })
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((p) => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
} */
