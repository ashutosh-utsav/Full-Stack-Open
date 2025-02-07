import { useState } from "react";


const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;


const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  return total > 0 ? (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Average" value={average.toFixed(2)} />
        <StatisticLine text="Positive" value={`${positivePercentage.toFixed(2)} %`} />
      </tbody>
    </table>
  ) : (
    <p>No feedback given</p>
  )
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" onClick={() => setGood(good + 1)} />
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" onClick={() => setBad(bad + 1)} />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
