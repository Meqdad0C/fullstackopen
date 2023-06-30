import { commentBlog, updateBlog } from '../reducers/blogReducer.js'
import { sendNotification } from '../reducers/notificationReducer.js'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Button, Form, ListGroup, Container, Row, Col } from 'react-bootstrap'

const BlogView = ({ blog }) => {
  if (!blog) {
    return null
  }
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleLike = async (event) => {
    event.preventDefault()
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 })).catch((error) =>
      sendNotification({ message: error.message, isError: true })
    )
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      const response = await dispatch(commentBlog(blog.id, comment))
      sendNotification({
        message: `comment added: ${response.content}`,
      })
    } catch (error) {
      sendNotification({ message: error.message, isError: true })
    }

    setComment('')
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>
            {blog.title} by {blog.author}
          </h1>
          {blog.url}
          <br />
          {blog.likes} likes{' '}
          <Button variant="primary" onClick={handleLike}>
            like
          </Button>{' '}
          <br />
          added by {blog.user.name}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>comments</h2>
          <ListGroup>
            {blog.comments.map((comment) => (
              <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
            ))}
          </ListGroup>
          <Form onSubmit={handleComment}>
            <Form.Control
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <Button type="submit">add comment</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default BlogView
