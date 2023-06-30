import { useState } from 'react'
import { sendNotification } from '../reducers/notificationReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer.js'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ parentRef }) => {
  const user = useSelector((state) => state.user)
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
      await dispatch(createBlog(blogObject, user))
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
      <Form onSubmit={submitNewBlog}>
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={newBlogTitle}
            placeholder="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            value={newBlogAuthor}
            placeholder="Author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            value={newBlogUrl}
            placeholder="URL"
            onChange={({ target }) => setNewBlogUrl(target.value)}
            autoComplete="off"
          />
        </Form.Group>
        <Button variant="primary" type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default BlogForm;
