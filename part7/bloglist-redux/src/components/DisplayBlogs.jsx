import Blog from './Blog.jsx'

const DisplayBlogs = ({ blogs }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      {blogs.slice().sort(byLikes).map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default DisplayBlogs
