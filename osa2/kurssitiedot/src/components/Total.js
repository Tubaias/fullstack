import React from 'react'

const Total = ({ parts }) => (
  <p>
    yhteensä {parts.reduce((sum, part) => sum + part.exercises, 0)} tehtävää
  </p>
)

export default Total