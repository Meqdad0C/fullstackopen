/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import db from './modules/db'
const Filter = ({ doFilter }) => {
  return (
    <div>
      filter shown with <input onChange={doFilter} />
    </div>
  )
}

const Notification = ({ message, category }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={category}>
      {message}
    </div>
  )
}
const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input
          value={props.newName}
          onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (p) => {
  const peopleToDisplay = p.filterName === ''
    ? p.persons
    : p.filteredPersons
  return (<div>
    {peopleToDisplay.map((person) =>
      <p
        key={person.id}>
        {person.name} {person.number}
        <button onClick={(e) => p.handleDelete(e, person)}>delete</button>
      </p>)
    }

  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [NotifcationMessage, setNotifcationMessage] = useState(null)
  const [errorFlag, setErrorFlag] = useState(false)

  useEffect(() => {
    db.getAll().then((persons) => setPersons(persons))
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newName === '') return
    const currPerson = persons.find(person => newName === person.name)
    if (currPerson) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }
      const newPerson = { ...currPerson, number: newNumber }
      db.updatePhone(currPerson.id, newPerson)
        .then((returnedPerson) => {
          setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
          setNotifcationMessage(
            `Updated ${newName}`
          )
          setTimeout(() => {
            setNotifcationMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error);
          setErrorFlag(true)
          setNotifcationMessage(
            `Information of '${newName}' has already been removed from server`
          )
          setTimeout(() => {
            setNotifcationMessage(null)
            setErrorFlag(false)
          }, 5000)
        })
      return
    }

    db.addPerson({ name: newName, number: newNumber })
      .then(newPerson => {
        const newPersons = persons.concat(newPerson)
        setPersons(newPersons)
        setErrorFlag(false)
        setNotifcationMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setNotifcationMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })

  }

  const handleDelete = (e, person) => {
    e.stopPropagation()
    if (!window.confirm(`Delete ${person.name} ?`)) {
      return
    }
    const request = db.deletePerson(person.id);
    request.then(() => {
      const newPersons = persons.filter((p) => p.id != person.id)
      setPersons(newPersons)
    }
    )
  }
  const doFilter = (e) => {
    const fiterValue = e.target.value.toLowerCase()
    setFilterName(fiterValue)
    if (fiterValue === '') return
    const newFilteredPersons = persons.filter((person) => person.name.toLowerCase().includes(fiterValue))
    setFilteredPersons(newFilteredPersons);
  }


  return (<>
    <div>
      <h1>Phonebook</h1>
      <Notification category={errorFlag ? 'error' : 'success'} message={NotifcationMessage} />
      <Filter doFilter={doFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
    </div>
    <div>
      <h2>Numbers</h2>

      <Persons
        filterName={filterName}
        filteredPersons={filteredPersons}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  </>
  )
}

export default App