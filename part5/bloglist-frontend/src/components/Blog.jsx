import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const response = await blogService.update(blog.id, {
      likes: blog.likes + 1,
    })
    response.user = blog.user

    setBlogs((blogs) =>
      blogs.map((blog) => (blog.id !== response.id ? blog : response))
    )
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id))
    }
  }

  const currentUser = JSON.parse(
    window.localStorage.getItem('loggedBlogAppUser')
  )

  return (
    <div style={blogStyle} className="blog">
      <div>
        <p>
          {blog.title}
        </p>
        Author: {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      <div style={{ display: visible ? '' : 'none' }}>
        {blog.url} <br />
        {blog.likes} likes <button onClick={handleLike}>like</button> <br />
        <p>added by: {blog.user.name}</p>
        {currentUser && blog.user.username === currentUser.username ? (
          <button onClick={handleRemove}>remove</button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Blog
