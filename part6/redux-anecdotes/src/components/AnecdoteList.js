import { useDispatch, useSelector } from 'react-redux'

const filteredAnecdotes = (anecdotes, filter) => {
  return anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div className="anecdote">
      <p>{anecdote.content}</p>
      <div>has {anecdote.votes} vote</div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) =>
    filter === '' ? anecdotes : filteredAnecdotes(anecdotes, filter)
  )
  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    dispatch({ type: 'anecdotes/voteAnecdote', payload: { id } })
    dispatch({
      type: 'notification/setNotification',
      payload: {
        notification: `you voted '${content}'`,
        timeoutId: setTimeout(() => {
          dispatch({ type: 'notification/clearNotification' })
        }, 5000),
      },
    })
  }

  return (
    <div className="container">
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} />
          <div>
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
