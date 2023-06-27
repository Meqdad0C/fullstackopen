import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import  Toggleable  from './components/Toggleable'
import './App.css'
import  LoginForm  from './components/LoginForm'
import  BlogForm  from './components/BlogForm'
import  DisplayBlogs  from './components/DisplayBlogs'
import  Notification  from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  let errorRef = useRef(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (message, error_flag) => {
    if (error_flag) errorRef.current = true
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
      if (error_flag) errorRef.current = false
    }, 5000)
  }

  const handleSubmit = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      returnedBlog.user = {
        id: returnedBlog.user,
        username: user.username,
        name: user.name,
      }
      setBlogs(blogs.concat(returnedBlog))
      handleNotification('Blog added successfully!', false)
    } catch (exception) {
      handleNotification('Fill missing fields!', true)
    }
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      handleNotification('Wrong credentials', true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }




  return (
    <>
      <h1>Blog List</h1>
      <Notification message={notificationMessage} errorRef={errorRef} />
      {user === null ? (
        <Toggleable buttonLabel="login">
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
              <BlogForm
                handleSubmit={handleSubmit}
                handleNotification={handleNotification}
              />
            </Toggleable>
          }
        </main>
      )}
      <DisplayBlogs blogs={blogs} setBlogs={setBlogs} />
    </>
  )
}

export default App
