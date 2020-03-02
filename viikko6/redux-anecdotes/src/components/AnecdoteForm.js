import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    event.target.anecdote.value = ''
    props.setNotification(`You created anecdote '${content}'`, 5)
  }

  return (
    <div>
      <h2>New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {
  createAnecdote, setNotification, removeNotification
}

const connectedForm = connect(mapStateToProps, mapDispatchToProps
)(AnecdoteForm)


export default connectedForm