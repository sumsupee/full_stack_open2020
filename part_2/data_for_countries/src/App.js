import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Display from './components/Display.js'
import Filter from './components/Filter.js'

const App = () => {
  const [ searchTerm, setSearchTerm] = useState('')
  const [ countries, setCountries] = useState([])

  
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const hook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook,[])

  return(
    <div>
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
      <Display searchTerm={searchTerm} countries={countries} setSearchTerm={setSearchTerm} />
    </div>
  )

}

export default App;
