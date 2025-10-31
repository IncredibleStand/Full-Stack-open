import { useState } from 'react'

const Display = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)
/*'const Statistics = (props) => (
  <>
    <h2>statistics</h2>
    
    {Object.entries(props).map(([text, value]) =>
     <Display key={text} text={text} value={value} />
    )}
  </>  
)'*/

const StatisticLine = ({ text, value}) => (
  <Display text={text} value={value} />
)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (setter, newValue) => () => setter(newValue)
  const total = good + neutral + bad
  const average = total ? ((good - bad) / total).toFixed(1) : 0
  const positive = total ? ((good / total) * 100).toFixed(1) + '%' : "0%"

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={setToValue(setGood, good + 1)} text="good" />
      <Button onClick={setToValue(setNeutral, neutral + 1)} text="neutral" />
      <Button onClick={setToValue(setBad,bad + 1)} text="bad" />
      <h2>statistics</h2>
      {total === 0 ? 
        (<> 
          <p>No feedback given</p>
        </>) : 
        (<table>
            <tbody>
              <StatisticLine text="good" value={good}/>
              <StatisticLine text="neutral" value={neutral}/>
              <StatisticLine text="bad" value={bad}/>
              <StatisticLine text="all" value={total}/>
              <StatisticLine text="average" value={average}/>
              <StatisticLine text="positive" value={positive}/>
          </tbody>
        </table>)
      }
    </>
  )
}

export default App
