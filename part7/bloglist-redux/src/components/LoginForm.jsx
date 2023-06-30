import { useState } from 'react'
import PropTypes from 'prop-types'
import { loginUser } from '../reducers/userReducer.js'
import { useDispatch } from 'react-redux'
import { sendNotification } from '../reducers/notificationReducer.js'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitCredentials = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser({ username, password }))
      dispatch(sendNotification({ message: 'Welcome back' }))
    } catch (exception) {
      console.log(exception)
      dispatch(sendNotification({ message: 'Wrong credentials', isError: true }))
    }
    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={submitCredentials}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default LoginForm
