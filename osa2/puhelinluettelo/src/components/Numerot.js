import React from 'react'

const Numerot = ({ persons, searchParam, handler }) => {
  const filteredpersons = persons.filter(person => person.name.toLowerCase().includes(searchParam.toLowerCase()))

  return <div>
    {filteredpersons.map(person => <div key={person.name}>{person.name} {person.number} <button value={person.id} onClick={handler}>poista</button></div> )}
  </div>
}

export default Numerot