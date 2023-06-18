import './App.css'

import { useState } from 'react'

const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>No feedback given</p>
  }
  else {
    let all = (good + neutral + bad)
    let average = (good / all) * 100
    let positive = (good - bad) / all
    return (<>
      <h2>statistics</h2>
      <table>
        <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive %' value={positive} />
        </tbody>
      </table>
    </>
    )
  }
}
const StatisticLine = ({ text, value }) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>

}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
