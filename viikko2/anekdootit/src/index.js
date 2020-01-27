import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MostPoint = ({vote, anecdotes}) => {
    const mostVoted = Math.max(...vote)
    const index = vote.indexOf(mostVoted)
    const mostVotedAnecdote = anecdotes[index]

    return (
        <div>
            <h1>Most voted Anecdote</h1>
            <p>{mostVotedAnecdote}</p>
            <p>Most voted anecdote has {mostVoted} votes</p>
        </div>
    )
}
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const nextClick = () =>{
      const randomnumber = Math.floor(Math.random()*anecdotes.length)
      setSelected(randomnumber)
  }

  const voteClick = () =>{
      const voteC = [...vote]
      voteC[selected]++
      setVotes(voteC)
  }
  return (
    <div>
      <h1>Anecdote of the Day</h1>  
      {props.anecdotes[selected]}
      <p>Anecdote has {vote[selected]} votes</p>
      <p>
        <button onClick={nextClick}>Next</button>
        <button onClick={voteClick}>Vote</button>
      </p>
      <MostPoint vote={vote} anecdotes={anecdotes} />
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
