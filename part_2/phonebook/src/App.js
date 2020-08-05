import React, { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchTerm, setSearchTerm] = useState('')
  const [ error, setError] =useState(null)
  const [ errorType, setErrorType] = useState('greenNotification') 
  
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
            setError(`Changed ${newName}'s number to ${newNumber}`)
            setErrorType('greenNotification')
            setTimeout(() => {
              setError(null)
              setErrorType(null)
            }, 5000)
          })
          .catch(error => {
            setError(`${newName} is already removed from server`)
            setErrorType('redNotification')
            setPersons(persons.filter(p => p.id!==person.id))
            setTimeout(()=>{
              setError(null)
              setErrorType(null) 
            }, 5000)
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
        setError(`Added ${newName}`)
        setErrorType('greenNotification')
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setError(null)
          setErrorType(null)
        }, 3000)
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
      <Notification message={error} errorType={errorType}/>
      <Filter searchTerm ={searchTerm} handleSearchTermChange = {handleSearchTermChange} />

      <h2>Add a new</h2>
      <PersonForm addName ={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons persons  = {persons} searchTerm ={searchTerm} handleDelete={handleDelete}/>

    </div>
  )
}

export default App
