import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(<button onClick={props.handleClick}>{props.text}</button>)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, changeVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  
  //Gets the index of the votes vector with maximum votes
  let maximus = votes.indexOf(Math.max(...votes));

  const voteChange= () => {
    const copy = [...votes]
    copy[selected] += 1
    return(
      () => changeVotes(copy)   
    )
  }
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={voteChange()} text='Vote' />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))} text='Next Anecdote' />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[maximus]}
      <br />
      has {votes[maximus]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
