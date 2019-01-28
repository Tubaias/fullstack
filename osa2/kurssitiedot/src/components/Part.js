import React from 'react'

const Part = (props) => (
  <li key={props.key}>
    {props.part} {props.exercises}
  </li>
)

export default Part