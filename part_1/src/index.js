import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.clickType}>{props.text}</button>
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickType={() => setGood(good + 1) } text='good' />
      <Button clickType={() => setNeutral(neutral + 1) } text='neutral' />
      <Button clickType={() => setBad(bad + 1) } text='bad' />
      <h1>statistics</h1>
      <p>good {good}<br />neutral {neutral}<br />bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
