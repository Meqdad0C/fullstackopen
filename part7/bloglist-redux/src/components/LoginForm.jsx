import { useState } from 'react'
import PropTypes from 'prop-types'
import { loginUser } from '../reducers/userReducer.js'
import { useDispatch } from 'react-redux'
import { sendNotification } from '../reducers/notificationReducer.js'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitCredentials = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser({ username, password }))
      dispatch(sendNotification({ message: `welcome back` }))
    } catch (exception) {
      console.log(exception)
      dispatch(
        sendNotification({ message: 'Wrong credentials', isError: true })
      )
    }
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
      <button type="submit" id="Login">
        do
      </button>
    </form>
  )
}

export default LoginForm
