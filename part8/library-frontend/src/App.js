import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import './App.css'
import LoginForm from './components/LoginForm'
import { Link, Routes, Route } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import RecommendedView from './components/RecommendedView'
const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const handleLogout = () => {
    client.resetStore()
    localStorage.clear()
    setToken(null)
  }

  return (
    <div>
      <div>
        <Link to="/">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        {token === null ? (
          <Link to="/login">
            <button>login</button>
          </Link>
        ) : (
          <span>
            <Link to="/add">
              <button>add book</button>
            </Link>
            <Link to={'/recommendations'}>
              <button> recommendations </button>
            </Link>
            <button onClick={handleLogout}>logout</button>
          </span>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommendations" element={<RecommendedView />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  )
}

export default App
