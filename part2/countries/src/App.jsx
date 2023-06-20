import axios from "axios"
import { useEffect, useState } from "react"

const getAllCountries = () => {
  const url = `https://studies.cs.helsinki.fi/restcountries/api/all`
  const request = axios.get(url).then(response => {
    const countries_data = response.data.map(({ name, capital, area, flags, languages }) => ({ name: name.common, capital, area, flag: flags.svg, languages }))
    return countries_data
  })
  return request
}

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [notfication, setNotfication] = useState(null)
  const handleChange = (e) => {
    const desiredCountry = e.target.value.toLowerCase()
    setSearchValue(desiredCountry)
    if (desiredCountry === '') {
      setNotfication(null)
      setCountries([])
      return
    }
    const filterdCountries = allCountries.filter((country => country.name.toLowerCase().includes(searchValue)))
    setCountries(filterdCountries)
    // Object.values(countries[0].languages).forEach(l=>console.log(l))
  }


  const handleSearch = (e) => {
    e.stopPropagation()
  }
  useEffect(() => {
    getAllCountries().then(data => setAllCountries(data))
  }, [])




  return (
    <>
      <h1>Find Countries <input type="search" onChange={handleChange} /> <button onClick={handleSearch}>search</button></h1>
      {
        countries.length > 10
          ? 'too many matches, specify another'
          : countries.length === 0 && searchValue !== ''
            ? 'no matches'
            : countries.length === 1
              ? <>
                <h2>
                  {countries[0].name}
                </h2>
                <p>
                  {countries[0].capital}<br />
                  {countries[0].area} km<sup>2</sup>
                </p>
                <h3>Languages:</h3>
                <ul>
                  {Object.values(countries[0].languages).map((l,i)=><li key={i}>{l}</li>)}
                </ul>
                <img src={countries[0].flag} width="300"/>
              </>
              : countries.map((c, i) => <p key={i}> {c.name} </p>)
      }
    </>
  )
}

export default App
