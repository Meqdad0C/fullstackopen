import { commentBlog, updateBlog } from '../reducers/blogReducer.js'
import { sendNotification } from '../reducers/notificationReducer.js'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const BlogView = ({ blog }) => {
  if (!blog) {
    return null
  }
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleLike = async (event) => {
    event.preventDefault()
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 })).catch((error) =>
      sendNotification({ message: error.message, isError: true })
    )
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      const response = await dispatch(commentBlog(blog.id, comment))
      sendNotification({
        message: `comment added: ${response.content}`,
      })
    } catch (error) {
      sendNotification({ message: error.message, isError: true })
    }

    setComment('')
  }

  return (
    <div>
      <div>
        <h1>
          {blog.title} by {blog.author}
        </h1>
        {blog.url}
        <br />
        {blog.likes} likes <button onClick={handleLike}>like</button> <br />
        added by {blog.user.name}
      </div>
      <div>
        <h2>comments</h2>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
        <form onSubmit={handleComment}>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
      </div>
    </div>
  )
}

export default BlogView
