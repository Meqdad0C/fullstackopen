import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const UserView = ({ user }) => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const userBlogs = blogs.slice().filter((blog) => blog.user.id === id)

  if (userBlogs.length === 0) {
    return <h3>No blogs found</h3>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ListGroup>
        {userBlogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default UserView
