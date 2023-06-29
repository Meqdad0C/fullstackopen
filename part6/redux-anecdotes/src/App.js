import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import './App.css'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
