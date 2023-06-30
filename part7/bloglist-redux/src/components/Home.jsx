import Toggleable from './Toggleable.jsx'
import LoginForm from './LoginForm.jsx'
import Header from './Header.jsx'
import BlogForm from './BlogForm.jsx'
import DisplayBlogs from './DisplayBlogs.jsx'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  return (
    <main>
      {user === null ? (
        <Toggleable buttonLabel="login" initialVisibility={true}>
          <LoginForm />
        </Toggleable>
      ) : (
        <div>
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm parentRef={blogFormRef} />
          </Toggleable>
        </div>
      )}
      <DisplayBlogs />
    </main>
  )
}

export default Home
