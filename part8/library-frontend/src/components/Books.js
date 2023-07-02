import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'
const { useQuery } = require('@apollo/client')

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (result.loading) {
    return <div>loading...</div>
  }
  const genres = books.map((b) => b.genres).flat()
  const uniqueGenres = [...new Set(genres)]
  const handleGenreChange = (event) => {
    let chosenGenre = event.target.value
    if (event.target.value === 'All') {
      setBooks(result.data.allBooks)
    } else {
      setBooks(result.data.allBooks.filter((b) => b.genres.includes(chosenGenre)))
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
