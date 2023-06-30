import { sendNotification } from '../reducers/notificationReducer.js'
import { logoutUser } from '../reducers/userReducer.js'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(sendNotification({ message: `logged out ${user.name}` }))
    dispatch(logoutUser())
  }
  return (
    <div>
      <p>{user.name} logged in</p>{' '}
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Header