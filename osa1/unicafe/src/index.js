import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ name, value, sign }) => (
  <td>{name} {value}{sign}</td>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>
      <h2>statistiikka</h2>
      <p>Ei yhtään palautetta annettu</p>
    </div>
  }

  return <div>
    <h2>statistiikka</h2>
    <table>
      <tbody>
        <tr><Statistic name="hyvä" value={good} /></tr>
        <tr><Statistic name="neutraali" value={neutral} /></tr>
        <tr><Statistic name="huono" value={bad} /></tr>
        <tr><Statistic name="yhteensä" value={good + neutral + bad} /></tr>
        <tr><Statistic name="keskiarvo" value={(good - bad) / good + neutral + bad} /></tr>
        <tr><Statistic name="positiivisia" value={good / (good + neutral + bad) * 100} sign="%" /></tr>
      </tbody>
    </table>
  </div>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>anna palautetta</h2>
      <Button text='hyvä' handleClick={handleGood} />
      <Button text='neutraali' handleClick={handleNeutral} />
      <Button text='huono' handleClick={handleBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)