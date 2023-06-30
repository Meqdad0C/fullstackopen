import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  if (message === '') {
    return null
  }

  return (
    <Alert variant={type}>
      {message}
    </Alert>
  )
}

export default Notification
