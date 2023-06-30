import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import './App.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import DisplayBlogs from './components/DisplayBlogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { sendNotification } from './reducers/notificationReducer.js'
import { initializeBlogs } from './reducers/blogReducer.js'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (message, isError) => {
    const notification = {
      message,
      type: isError ? 'error' : 'success',
    }
    dispatch(sendNotification(notification, 5))
  }

  const handleSubmit = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      newBlog.user = {
        id: newBlog.user,
        username: user.username,
        name: user.name,
      }
      dispatch({ type: 'blogs/addBlog', payload: { newBlog } })
      handleNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
    } catch (exception) {
      handleNotification('Error adding blog: Fill missing fields', true)
    }
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      handleNotification(`welcome back ${user.name}`)
    } catch (exception) {
      handleNotification('Wrong credentials', true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    handleNotification(`logged out ${user.name}`)
    setUser(null)
  }

  return (
    <>
      <h1>Blog List</h1>
      <Notification notification={notification} />
      {user === null ? (
        <Toggleable buttonLabel="login" initialVisibility={true}>
          <LoginForm handleLogin={handleLogin} />
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
