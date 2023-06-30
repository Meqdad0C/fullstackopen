import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Toggleable from './components/Toggleable'
import './App.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import DisplayBlogs from './components/DisplayBlogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { sendNotification } from './reducers/notificationReducer.js'
import { initializeBlogs } from './reducers/blogReducer.js'
import {
  initializeUser,
  logoutUser,
} from './reducers/userReducer.js'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleSubmit = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      newBlog.user = {
        id: newBlog.user,
        ...user,
      }
      dispatch({ type: 'blogs/addBlog', payload: { newBlog } })
      dispatch(
        sendNotification({
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        })
      )
    } catch (exception) {
      dispatch(
        sendNotification({
          message: 'Error adding blog: Fill missing fields',
          isError: true,
        })
      )
    }
  }

  const handleLogout = () => {
    dispatch(sendNotification({ message: `logged out ${user.name}` }))
    dispatch(logoutUser())
  }

  return (
    <>
      <h1>Blog List</h1>
      <Notification />
      {user === null ? (
        <Toggleable buttonLabel="login" initialVisibility={true}>
          <LoginForm />
        </Toggleable>
      ) : (
        <main>
          <div>
            <p>{user.name} logged in</p>{' '}
            <button onClick={handleLogout}>logout</button>
          </div>
          {
            <Toggleable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm handleSubmit={handleSubmit} />
            </Toggleable>
          }
        </main>
      )}
      <DisplayBlogs blogs={blogs} />
    </>
  )
}

export default App
