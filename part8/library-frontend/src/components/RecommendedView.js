import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import { useEffect, useState } from 'react'

const RecommendedView = () => {
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const userResult = useQuery(ME)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (userResult.data) {
      getBooks({ variables: { genre: userResult.data.me.favoriteGenre } })
    }
  }, [getBooks, userResult.data])

  useEffect(() => {
    if (booksResult.data) {
      console.log('setting books', booksResult.data)
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult.data])

  if (booksResult.loading) {
    return <div>loading...</div>
  }
  if (userResult.loading) {
    return <div>loading...</div>
  }

  console.log('rendering')
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
          {books.map((b) => (
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
