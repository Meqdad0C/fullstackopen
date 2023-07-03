import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import './App.css'
import LoginForm from './components/LoginForm'
import { Link, Routes, Route } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { useSubscription } from '@apollo/client'
import RecommendedView from './components/RecommendedView'
import { ALL_BOOKS, BOOK_ADDED } from './queries'


// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

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
