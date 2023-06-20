/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"

const getAllCountries = () => {
  const url = `https://studies.cs.helsinki.fi/restcountries/api/all`
  const request = axios.get(url).then(response => {
    const countries_data = response.data.map(({ name, capital, area, flags, languages, latlng }) => ({ name: name.common, capital, area, flag: flags.svg, languages, shown: false, lat: latlng[0], lon: latlng[1] }))
    return countries_data
  })
  return request
}

const Country = ({ size, c, handleShow, i, getWeather }) => {
  const [weather, setWeather] = useState(false)
  useEffect(() => {
    getWeather(c).then(result => { c.temp = result.temp; c.speed = result.speed; c.icon = result.icon; setWeather(true) })
    }, [])
  
  if (!weather) return null
  if (c.shown || size === 1) {
    console.log(c);
    return <>
      <h2>
        {c.name}
      </h2>
      <p>
        Capital {c.capital}<br />
        Area {c.area} km<sup>2</sup>
      </p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(c.languages).map((l, i) => <li key={i}>{l}</li>)}
      </ul>
      <img src={c.flag} width="300" />
      {size===1? null:<button onClick={(e) => { handleShow(e, i) }} >{c.shown ? 'hide' : 'show'}</button>}
      <h3>Weather in {c.name}</h3>
      <p>
        temprature {c.temp} Celcius<br />
        <img src={c.icon} /><br />
        wind {c.speed} m/s
      </p>

    </>
  }
  return <div>{c.name} <button onClick={(e) => { handleShow(e, i) }} >{c.shown ? 'hide' : 'show'}</button> </div>
}

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  useEffect(() => {
    getAllCountries().then(data => setAllCountries(data))
  }, [])
  const handleChange = (e) => {
    const desiredCountry = e.target.value.toLowerCase()
    console.log(desiredCountry);
    setSearchValue(desiredCountry)
    if (desiredCountry === '') {
      setCountries([])
      return
    }
    const filterdCountries = allCountries.filter((country => country.name.toLowerCase().includes(desiredCountry)))
    console.log(filterdCountries);
    setCountries(filterdCountries)
  }
  const handleShow = (e, i) => {
    console.log('handle show ', i);
    e.stopPropagation()
    const newDisplayedCountries = countries.slice()
    newDisplayedCountries[i].shown = !newDisplayedCountries[i].shown
    setCountries(newDisplayedCountries)
    console.log(countries[i].shown);
  }

  const getWeather = (c) => {
    console.log(c);
    const api_key = import.meta.env.VITE_WEATHER_KEY
    const lon = c.lon
    const lat = c.lat
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

    const request = axios.get(url)
    return request.then(response => {
      console.log(response.data);
      return ({
        temp: response.data.main.temp - 273, speed: response.data.wind.speed
        , icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      })
    }
    )
  }

  return (
    <>
      <h1>Find Countries <input type="search" onChange={handleChange} autoComplete="disabled" /></h1>
      {
        countries.length > 10
          ? 'too many matches, specify another'
          : countries.length === 0 && searchValue !== ''
            ? 'no matches'
            : countries.map((c, i) => <Country key={i} i={i} c={c} size={countries.length} handleShow={handleShow} getWeather={getWeather} />)
      }
    </>
  )
}

export default App
