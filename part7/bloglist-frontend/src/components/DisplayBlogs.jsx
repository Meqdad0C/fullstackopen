import Blog from './Blog.jsx'
import blogService from '../services/blogs'

const DisplayBlogs = ({ blogs, setBlogs }) => {
  const doLike = async (blog) => {
    try {
      const response = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      })
      response.user = blog.user

      setBlogs((blogs) =>
        blogs.map((blog) => (blog.id !== response.id ? blog : response))
      )
    } catch (error) {
      console.log(error)
    }
  }
  const doRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id))
    } catch (error) {
      console.log(error)
    }
  }
  const handlers = { doLike, doRemove }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handlers={handlers} />
      ))}
    </div>
  )
}

export default DisplayBlogs
