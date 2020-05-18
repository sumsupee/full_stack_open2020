import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.clickType}>{props.text}</button>
}

const Statistic = (props) => {
  return (
  <tbody>
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}{props.sign}</td>
    </tr>
  </tbody>
  )
}

const Statistics = ({good,neutral,bad,sumAll,averageAll,positivePercentage}) => { 
if(good===0 & neutral===0 & bad ===0)
{return <div>No feedback given</div>}

else{
return( 
  <table>
    <Statistic text='good' value={good} />
    <Statistic text='neutral' value={neutral} />
    <Statistic text='bad' value={bad} />
    <Statistic text='all' value={sumAll} />
    <Statistic text='average' value={averageAll} />
    <Statistic text='positive' value={positivePercentage} sign='%'/>
  </table>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //Unicafe Step 2
  let sumAll = good + neutral + bad
  let averageAll = (good*1 + neutral*0 + bad*-1)/sumAll
  let positivePercentage = (good/sumAll)*100

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickType={() => setGood(good + 1) } text='good' />
      <Button clickType={() => setNeutral(neutral + 1) } text='neutral' />
      <Button clickType={() => setBad(bad + 1) } text='bad' />
      <h1>statistics</h1>
      {Statistics({good,neutral,bad,sumAll,averageAll,positivePercentage})} 

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
