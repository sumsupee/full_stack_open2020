import React, {useState, useEffect} from 'react';
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

const Weather = (props) => {
    const [ weather, setWeather] =useState([])
    const {capital} = props.countriesList[0]
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`;
  
    const weatherHook = () => {
      axios
        .get(url)
        .then(responseWeather => {
          setWeather(responseWeather.data)
        })
      }
    
    useEffect(weatherHook,[API_KEY,capital])

    if(weather===undefined){
      return(<div>Loading...</div>)
    } else {
      return(<div>
        <h2>Weather in {capital}</h2>
        <div><b>temeperature:</b> {weather.current?.temperature} Celcius</div>
        <img src={weather.current?.weather_icons[0]} alt="Weather Icon" />
        <div><b>wind: </b> {weather.current?.wind_speed} mph direction {weather.current?.wind_dir}</div>
        </div>)
    }
  }

export default Weather

