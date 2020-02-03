import React, { useState, useEffect } from 'react';
import axios from 'axios'


const ShowCountry = (props) =>{
  const amount = props.countrylist.length
  if (amount === 1){
    return (
      <Country country={props.countrylist[0]} weather={props.weather}/>
    )
  }
  return(
    amount > 10
    ? <div>Too many possible countries</div>
    : props.countrylist.map(country =>
      <li key={country.name}>
        {country.name} <button onClick={()=> props.clickHandler(country.name)}>
          Open
        </button>
      </li>
    )
  )
}

const Country = (props) => {
  const country = props.country
  return(
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      {country.languages.map(language => <li key={language}>{language}</li>)}
      <img src={country.flag} alt="flag" width="300" height="200" /> 
      <h3>Weather in {props.weather.capital}</h3>
      <p>temperature {props.weather.temp} celsius</p>
      <p>wind {props.weather.wind} mps</p>

    </div>
  )
}
const App= () => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState({})
  const apikey = process.env.REACT_APP_API_KEY

  useEffect(()=> {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res =>{
      const newCountryList = res.data.map(country => {
        return(
          {
            name: country.name,
            capital: country.capital,
            population:country.capital,
            languages: country.languages.map(i => i.name),
            flag: country.flag
          }
        )
      })
      setCountries(newCountryList)
      setFilterCountries(newCountryList)
    })
  },[])

  const weatherGetter = list =>{
    if(list.length ===1){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${list[0].capital}&units=metric&appid=${apikey}`)
      .then(res=>{
        console.log(res)
        const getData = res.data
        const newWeather = {
          capital: getData.name,
          temp: getData.main.temp,
          wind: getData.wind.speed
        }
        setWeather(newWeather)
      })
    }
  }
  const changeHandler =(event)=>{
    const search = event.target.value
    setFilter(search)
    const searchList = countries
    .filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    setFilterCountries(searchList)
    weatherGetter(searchList)
  }
  const clickHandler =(name)=>{
    setFilter(name)
    const searchList = countries
    .filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    setFilterCountries(searchList)
    weatherGetter(searchList)
  }
  return(
    <div>
      Search country<input value={filter} onChange={changeHandler}/>
      <ShowCountry countrylist={filterCountries} weather={weather} clickHandler={clickHandler}/>
    </div>
  )
}

export default App;
