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
import Home from './components/Home.jsx'
import { Route, Routes, useMatch } from 'react-router-dom'
import Users from './components/Users.jsx'
import UserView from './components/UserView.jsx'
import BlogView from './components/BlogView.jsx'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const userMatch = useMatch('/users/:id')
  const user = userMatch ? blogs.find((blog) => blog.user.id === userMatch.params.id) : null
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find((blog) => blog.id === blogMatch.params.id) : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  return (
    <>
      <Header />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserView user={user} />} />
        <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
      </Routes>
    </>
  )
}

export default App
