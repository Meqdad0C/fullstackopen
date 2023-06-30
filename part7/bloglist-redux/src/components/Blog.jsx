import { useState } from 'react'
import { deleteBlog, updateBlog } from '../reducers/blogReducer.js'
import { useDispatch } from 'react-redux'
import { sendNotification } from '../reducers/notificationReducer.js'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

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
    <div style={blogStyle} className="blog">
      <div>
        <div>
          <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author} </Link>
        </div>
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div
        style={{ display: visible ? '' : 'none' }}
        className="togglableContent"
      >
        <div> {blog.url}</div>
        <div>
          {' '}
          {blog.likes} likes <button onClick={handleLike}>like</button>{' '}
        </div>
        <div> added by: {blog.user.name} </div>
        <div>
          {currentUser && blog.user.username === currentUser.username ? (
            <button onClick={handleRemove}>remove</button>
          ) : (
            ''
          )}{' '}
        </div>
      </div>
    </div>
  )
}

export default Blog
