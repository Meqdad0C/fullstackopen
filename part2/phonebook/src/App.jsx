/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState,useEffect } from 'react'

const Filter = ({ doFilter }) => {
  return (
    <div>
      filter shown with <input onChange={doFilter} />
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
  return (<div>
    {p.filterName === ''
      ? p.persons.map((person) => <p key={person.id} >{person.name} {person.number}</p>)
      : p.filteredPersons.map((person) => <p key={person.id} >{person.name} {person.number}</p>)
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

  useEffect(() => {
    const response = axios.get('http://localhost:3001/persons')
    
    response.then((response)=>setPersons(response.data))

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
    if (persons.find(person => newName === person.name)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPersons = persons.concat({ name: newName, number: newNumber, id: persons.length + 1 })
    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
  }
  const doFilter = (e) => {
    const fiterValue = e.target.value.toLowerCase()
    setFilterName(fiterValue)
    if (fiterValue === '') return
    const newFilteredPersons = persons.filter((person) => person.name.toLowerCase().includes(fiterValue))
    setFilteredPersons(newFilteredPersons);
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter doFilter={doFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        filterName={filterName}
        filteredPersons={filteredPersons}
        persons={persons}
      />

    </div>
  )
}

export default App