import { useEffect, useRef } from 'react'
import Toggleable from './components/Toggleable'
import './App.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import DisplayBlogs from './components/DisplayBlogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer.js'
import { initializeUser } from './reducers/userReducer.js'
import Header from './components/Header.jsx'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

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
          <Header />
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm parentRef={blogFormRef} />
          </Toggleable>
        </main>
      )}
      <DisplayBlogs />
    </>
  )
}

export default App
