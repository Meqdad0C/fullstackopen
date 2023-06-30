import Blog from './Blog.jsx'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'

const DisplayBlogs = () => {
  const blogs = useSelector((state) => state.blogs)

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Card>
        <Card.Body>
          {blogs
            .slice()
            .sort(byLikes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </Card.Body>
      </Card>
    </div>
  )
}

export default DisplayBlogs
