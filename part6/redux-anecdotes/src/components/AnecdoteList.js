import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  return (
    <div className="anecdote">
      <p>{anecdote.content}</p>
      <div>has {anecdote.votes} vote</div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const byVotes = (a1, a2) => a2.votes - a1.votes
    const bySearched = (anecdote) => {
      if (filter.length === 0) {
        return true
      }
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    }
    return anecdotes.filter(bySearched).sort(byVotes)
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(
      updateAnecdote(anecdote, { ...anecdote, votes: anecdote.votes + 1 })
    )
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
