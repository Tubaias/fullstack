import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Numerot from './components/Numerot'
import LisaysLomake from './components/LisaysLomake';
import HakuLomake from './components/HakuLomake';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchParam, setSearchParam] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const names = persons.map(p => p.name)
    if (names.includes(newName)) {
      window.alert(`${newName} on jo luettelossa`)
      return
    }

    const person = { name: newName, number: newNumber }

    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchParam(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      rajaa näytettäviä <HakuLomake searchParam={searchParam} handleSearchChange={handleSearchChange} />
      <h3>lisää uusi</h3>
      <LisaysLomake addPerson={addPerson}
                    newName={newName}
                    handleNameChange={handleNameChange}
                    newNumber={newNumber}
                    handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Numerot persons={persons} searchParam={searchParam} />
    </div>
  )
}

export default App