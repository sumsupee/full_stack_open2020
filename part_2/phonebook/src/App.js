import React, { useState } from 'react'

const Filter = (props) => {
  return (
    <div>filter shown with : <input 
      value = {props.searchTerm} onChange ={props.handleSearchTermChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
  <form onSubmit = {props.addName}>
    <div>
      name: <input 
      value = {props.newName}
      onChange = {props.handleNameChange}/>
    </div>
    <div>
      number: <input 
      value = {props.newNumber}
      onChange ={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = (props) => {
  return (
    <div>
    {props.persons.filter((person) => person.name.toLowerCase().includes(props.searchTerm.toLowerCase())).map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchTerm, setSearchTerm] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    if (persons.find((props) => props.name === newName )) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
    const nameObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm ={searchTerm} handleSearchTermChange = {handleSearchTermChange} />

      <h2>Add a new</h2>
      <PersonForm addName ={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons persons  = {persons} searchTerm ={searchTerm} />

    </div>
  )
}

export default App
