import { sendNotification } from '../reducers/notificationReducer.js'
import { logoutUser } from '../reducers/userReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(sendNotification({ message: `logged out ${user.name}` }))
    dispatch(logoutUser())
  }
  const style = {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginBottom: 30,
  }
  return (
    <div>
      <h1>Blog App</h1>
      <div style={style}>
        <Link to={'/'}>blogs</Link> <Link to={'/users'}>users</Link>
        {user ? (
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        ) : null}
      </div>
    </div>
  )
}

export default Header
