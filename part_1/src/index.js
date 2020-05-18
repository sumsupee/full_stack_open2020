import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.clickType}>{props.text}</button>
}

const Statistics = ({good,neutral,bad,sumAll,averageAll,positivePercentage}) => { 
if(good===0 & neutral===0 & bad ===0)
{return <div>No feedback given</div>}
else
{
return( 
  <div>
    <p>good {good}
      <br />neutral {neutral}
      <br />bad {bad}


      {/* Unicafe Step 2 */}
      <br />all {sumAll}
      <br />average {averageAll}
      <br />positive {positivePercentage}%
    </p>
  </div>)
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
