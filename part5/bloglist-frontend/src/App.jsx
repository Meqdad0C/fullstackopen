import { useState, useEffect } from 'react'
import Blog from './components/Blog.jsx'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Toggleable from './components/Toggleable.jsx'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitCredentials = async (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={submitCredentials}>
      <div>
        username{' '}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          autoComplete={'off'}
        />
      </div>
      <div>
        password{' '}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

const Notification = ({ message, errorFlag }) => {
  if (message === null) {
    return null
  }

  return <div className={errorFlag ? 'error' : 'success'}>{message}</div>
}

const BlogForm = ({ handleSubmit }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const submitNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    handleSubmit(blogObject)

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <>
      <h2>blog form</h2>
      <form onSubmit={submitNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
            autoComplete={'off'}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            autoComplete={'off'}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogUrl}
            name="Url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
            autoComplete={'off'}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

const DisplayBlogs = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorFlag, setErrorFlag] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
    if (error_flag) setErrorFlag(error_flag)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
      if (error_flag) setErrorFlag(false)
    }, 5000)
  }

  const handleSubmit = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      handleNotification('Blog added successfully!')
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
      <Notification message={notificationMessage} errorFlag={errorFlag} />
      {user === null ? (
        <Toggleable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
          />
        </Toggleable>
      ) : (
        <main>
          <div>
            <p>{user.name} logged in</p>{' '}
            <button onClick={handleLogout}>logout</button>
          </div>
          {
            <Toggleable buttonLabel="new blog">
              <BlogForm
                handleSubmit={handleSubmit}
                handleNotification={handleNotification}
              />
            </Toggleable>
          }
        </main>
      )}
      <DisplayBlogs blogs={blogs} />
    </>
  )
}

export default App
