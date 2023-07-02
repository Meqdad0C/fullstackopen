import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import { useEffect, useState } from 'react'

const RecommendedView = () => {
  const result = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (result.loading) {
    return <div>loading...</div>
  }
  if (userResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h1>Recommendations</h1>
      <p>
        books in your favorite genre <b>{userResult.data.me.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((b) => {
              return b.genres.includes(userResult.data.me.favoriteGenre)
            })
            .map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedView
