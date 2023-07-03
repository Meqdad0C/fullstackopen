import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

const Books = () => {
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(() => {
    getBooks()
  }, [getBooks])

  useEffect(() => {
    console.log(booksResult)
    if (booksResult.data) {
      console.log('setting books')
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult.data])

  if (booksResult.loading) {
    return <div>loading...</div>
  }
  const genres = books.map((b) => b.genres).flat()
  const uniqueGenres = [...new Set(genres)]
  const handleGenreChange = (event) => {
    let chosenGenre = event.target.value
    if (event.target.value === 'All') {
      getBooks()
    } else {
      getBooks({ variables: { genre: chosenGenre } })
    }
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((g, i) => (
          <button key={i} onClick={handleGenreChange} value={g}>
            {g}
          </button>
        ))}
        <button onClick={handleGenreChange} value="All">
          All
        </button>
      </div>
    </div>
  )
}

export default Books
