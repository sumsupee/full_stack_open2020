import React, { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchTerm, setSearchTerm] = useState('')
  
  useEffect( () => {
    contactService
      .getAll()
      .then(initialContacts => setPersons(initialContacts))
  },[])
  
  const addName = (event) => {
    event.preventDefault()
    const person = persons.find((props) => props.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const nameObject = {...person, number:newNumber}
        contactService
          .update(person.id,nameObject)
          .then(returnedContact => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedContact))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else {
    const nameObject = {
      name: newName,
      number: newNumber
    }

    contactService
      .create(nameObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }
  
  const handleDelete = (id,name) => {
    if(window.confirm(`Delete: ${name}?`)){
    contactService
      .deleteContact(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm ={searchTerm} handleSearchTermChange = {handleSearchTermChange} />

      <h2>Add a new</h2>
      <PersonForm addName ={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons persons  = {persons} searchTerm ={searchTerm} handleDelete={handleDelete}/>

    </div>
  )
}

export default App
