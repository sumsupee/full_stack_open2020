import React, {useState, useEffect} from 'react';
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

const Weather = (props) => {
    const [ weather, setWeather] =useState([])
    const {capital} = props.countriesList[0]
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`;
    console.log(API_KEY)
    console.log(url)
  
    const weatherHook = () => {
      axios
        .get(url)
        .then(responseWeather => setWeather(responseWeather.data))
      }
    
    useEffect(weatherHook,[])
  
    console.log(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`)
    console.log(weather.current)
    return(
      <div>
        {/* {weather["current"].temperature} */}
      </div>
  
    )
  }

export default Weather

