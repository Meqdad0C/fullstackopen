import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = ({ user }) => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const userBlogs = blogs.slice().filter((blog) => blog.user.id === id)
  if (userBlogs.length === 0) {
    return (<h3>No blogs found</h3>)
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
