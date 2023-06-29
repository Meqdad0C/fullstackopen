import React from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({ type: 'anecdotes/createAnecdote', payload: { newAnecdote } })

    dispatch({
      type: 'notification/setNotification',
      payload: {
        notification: `you created '${content}'`,
        timeoutId: setTimeout(() => {
          dispatch({ type: 'notification/clearNotification' })
        }, 5000),
      },
    })
  }

  return (
    <div className="container">
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input autoComplete="off" type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
