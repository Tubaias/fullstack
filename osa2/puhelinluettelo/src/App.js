import React, { useState, useEffect } from 'react'
import Numerot from './components/Numerot'
import LisaysLomake from './components/LisaysLomake'
import HakuLomake from './components/HakuLomake'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchParam, setSearchParam] = useState('')
  const [notification, setNotification] = useState('')
  const [errorNotification, setErrorNotification] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = { name: newName, number: newNumber }

    const names = persons.map(p => p.name)
    if (names.includes(newName)) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        updatePerson(person)
      }

      return
    }

    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        notify(`henkilö '${person.name}' lisätty`)
      })
  }

  const updatePerson = (person) => {
    const id = persons.find(p => p.name === person.name).id

    personService
      .update(id, person)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
        notify(`henkilön '${person.name}' numero päivitetty.`)
      })
  }

  const deletePerson = (event) => {
    const personToDelete = persons.find(person => person.id == event.target.value)

    if (!window.confirm(`Poistetaanko ${personToDelete.name}?`)) {
      return
    }

    personService
      .remove(event.target.value)
      .then(removedPerson => {
        // ???
        setPersons(persons.filter(person => person.id !== removedPerson.id))
        notify(`henkilö '${personToDelete.name}' poistettu palvelimelta.`)
      })
      .catch(error => {
        notifyError(`Henkilö ${personToDelete.name} oli jo poistettu.`)
    })
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

  const notify = (message) => {
    setNotification(message)

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const notifyError = (message) => {
    setErrorNotification(message)

    setTimeout(() => {
      setErrorNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <ErrorNotification message={errorNotification} />
      <Notification message={notification} />
      rajaa näytettäviä <HakuLomake searchParam={searchParam} handleSearchChange={handleSearchChange} />
      <h3>lisää uusi</h3>
      <LisaysLomake addPerson={addPerson}
                    newName={newName}
                    handleNameChange={handleNameChange}
                    newNumber={newNumber}
                    handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Numerot persons={persons} searchParam={searchParam} handler={deletePerson} />
    </div>
  )
}

export default App