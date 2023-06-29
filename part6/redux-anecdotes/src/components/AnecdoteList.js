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

  const vote = (id) => {
    dispatch({ type: 'anecdotes/voteAnecdote', payload: { id } })
  }

  return (
    <div className="container">
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} />
          <div>
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
