import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Weather from './components/Weather.js'

const Filter = (props) => {
  return (
    <div>find countries: <input 
      value = {props.searchTerm} onChange ={props.handleSearchTermChange}/>
    </div>
  )
}

const Display = (props) => {

  const countriesList = props.countries
  .filter((country)=>  country.name.toLowerCase().includes(props.searchTerm.toLowerCase()) ) 

  const lenghtList = countriesList.length
  if (lenghtList > 10) {
    return (
      <div><h3>Too many matches, specify another filter</h3></div>
    )
  } else if (lenghtList === 1) {

    console.log(countriesList[0].name)
    
    return(
      countriesList
        .map((country) => 
          <div key={country.name}>
            <div><h1>{country.name}</h1></div>
            <div>
              Capital: {country.capital}
            </div>
            <div>
              Population: {country.population}
            </div>
            <div><h2>Languages</h2></div>
            <div><ul>{country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)}</ul></div>
            <img src={country.flag} width="126" height="84" alt={country.name + " flag"}/>
            <Weather countriesList={countriesList} />
          </div>
        )
    )
  } else {
    return (
      <div>
        <div><h2>Countries</h2></div>
        {countriesList.map( (country) => <div key={country.name}>{country.name} <button onClick={()=>props.setSearchTerm(country.name)} >show</button></div> )}
      </div>
    )
  } 
}

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
