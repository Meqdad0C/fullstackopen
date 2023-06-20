/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"

const getAllCountries = () => {
  const url = `https://studies.cs.helsinki.fi/restcountries/api/all`
  const request = axios.get(url).then(response => {
    const countries_data = response.data.map(({ name, capital, area, flags, languages }) => ({ name: name.common, capital, area, flag: flags.svg, languages, shown: false }))
    return countries_data
  })
  return request
}

const Country = ({ c, handleShow, i, show }) => {
  console.log('iam country component ', c);
  if (show || c.shown) {
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
    </>
  }
  return <div>{c.name} <button onClick={(e) => { handleShow(e, i) }} >show</button> </div>
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

  return (
    <>
      <h1>Find Countries <input type="search" onChange={handleChange} autoComplete="disabled" /></h1>
      {
        countries.length > 10
          ? 'too many matches, specify another'
          : countries.length === 0 && searchValue !== ''
            ? 'no matches'
            : countries.length === 1
              ? <Country key={0} i={0} c={countries[0]} handleShow={handleShow} show={true} />
              : countries.map((c, i) => <Country key={i} i={i} c={countries[i]} handleShow={handleShow} show={false} />)
      }
    </>
  )
}

export default App
