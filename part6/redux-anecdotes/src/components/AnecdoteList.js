import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

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

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote,{ ...anecdote, votes: anecdote.votes + 1 }))
    dispatch(sendNotification(`you voted '${anecdote.content}'`, 5))
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
