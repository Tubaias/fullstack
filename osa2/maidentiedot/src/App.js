import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    filterCountries(event.target.value)
  }

  const filterCountries = (searchParam) => {
    setFilteredCountries(allCountries.filter(country => country.name.toLowerCase().includes(searchParam.toLowerCase())))
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      <CountryInfo countries={filteredCountries} handler={handleSearchChange} />
    </div>
  )
}

export default App;
