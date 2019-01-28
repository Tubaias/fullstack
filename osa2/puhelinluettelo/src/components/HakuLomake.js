import React from 'react'

const HakuLomake = ({ searchParam, handleSearchChange }) => (
    <input value={searchParam} onChange={handleSearchChange}/>
)

export default HakuLomake