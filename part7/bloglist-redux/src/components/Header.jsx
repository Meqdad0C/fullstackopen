import { sendNotification } from '../reducers/notificationReducer.js'
import { logoutUser } from '../reducers/userReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Header = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(sendNotification({ message: `logged out ${user.name}` }))
    dispatch(logoutUser())
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Blogs</Nav.Link>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav>
        {user && (
          <Nav className="ml-auto">
            <Nav.Item className="mr-2">
              <span className="user-name" >{user.name} logged in</span>
            </Nav.Item>
            <Nav.Item>
              <Button variant="outline-primary" onClick={handleLogout}>
                Logout
              </Button>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
