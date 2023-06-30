import { useState } from 'react'
import { sendNotification } from '../reducers/notificationReducer.js'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer.js'

const BlogForm = ({ parentRef }) => {
  const dispatch = useDispatch()
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const resetForm = () => {
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }

  const submitNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    try {
      parentRef.current.toggleVisibility()
      await dispatch(createBlog(blogObject))
      dispatch(
        sendNotification({
          message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        })
      )
      resetForm()
    } catch (exception) {
      dispatch(
        sendNotification({
          message: 'Error adding blog: Fill missing fields',
          isError: true,
        })
      )
    }
  }

  return (
    <div className="blogFormDiv">
      <h2>blog form</h2>
      <form onSubmit={submitNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="Title"
            placeholder={'Title'}
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
            placeholder={'Author'}
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
            placeholder={'Url'}
            onChange={({ target }) => setNewBlogUrl(target.value)}
            autoComplete={'off'}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
