import { useState } from 'react'
import { deleteBlog, updateBlog } from '../reducers/blogReducer.js'
import { useDispatch } from 'react-redux'
import { sendNotification } from '../reducers/notificationReducer.js'
import { Link } from 'react-router-dom'
import { Card, Button, Badge } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 })).catch((error) =>
      sendNotification({ message: error.message, isError: true })
    )
  }

  const handleRemove = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id)).catch((error) =>
        sendNotification({ message: error.message, isError: true })
      )
    }
  }

  const currentUser = JSON.parse(
    window.localStorage.getItem('loggedBlogAppUser')
  )

  return (
    <Card className="blog mb-3">
      <Card.Body>
        <Card.Title>
          <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
        </Card.Title>
        <Button variant="primary" size="sm" onClick={() => setVisible(!visible)}>
          {visible ? 'Hide' : 'View'}
        </Button>
        {visible && (
          <div className="mt-3">
            <Card.Text>{blog.url}</Card.Text>
            <Card.Text>
              {blog.likes} likes{' '}
              <Button variant="success" size="sm" onClick={handleLike}>
                Like
              </Button>
            </Card.Text>
            <Card.Text>Added by: {blog.user.name}</Card.Text>
            {currentUser && blog.user.username === currentUser.username && (
              <Button variant="danger" size="sm" onClick={handleRemove}>
                Remove
              </Button>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default Blog
