import React from 'react';

const CountryInfo = ({ countries, handler }) => {
  if (countries.length === 1) {
    const c = countries[0]
    return <div>
      <h2>{c.name}</h2>
      <p>capital {c.capital}</p>
      <p>population {c.population}</p>
      <h3>languages</h3>
      <ul>
        {c.languages.map(lang => <li key={lang.iso639_2}>{lang.name}</li>)}
      </ul>
      <img alt='flag' src={c.flag} height='10%' width='10%' />
    </div>
  } else if (countries.length < 11) {
    return <ul>
      {countries.map(c => <li key={c.name} >{c.name} <button value={c.name} onClick={handler}>show</button></li>)}
    </ul>
  } else {
    return <p>Too many matches, specify another filter</p>
  }
}

export default CountryInfo