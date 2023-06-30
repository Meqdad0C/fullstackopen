import { updateBlog } from '../reducers/blogReducer.js'
import { sendNotification } from '../reducers/notificationReducer.js'
import { useDispatch } from 'react-redux'

const BlogView = ({ blog }) => {
  if (!blog) {
    return null
  }
  const dispatch = useDispatch()

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 })).catch((error) =>
      sendNotification({ message: error.message, isError: true })
    )
  }

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      {blog.url}
      <br />
      {blog.likes} likes <button onClick={handleLike}>like</button> <br />
      added by {blog.user.name}
    </div>
  )
}

export default BlogView
