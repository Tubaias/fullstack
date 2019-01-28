import React from 'react'

const Numerot = ({ persons, searchParam }) => {
  const filteredpersons = persons.filter(person => person.name.toLowerCase().includes(searchParam.toLowerCase()))

  return <div>
    {filteredpersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
  </div>
}

export default Numerot