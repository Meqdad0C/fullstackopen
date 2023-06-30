import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import _ from 'lodash'

const Users = () => {
  const blogs = useSelector((state) => state.blogs)
  const id_blogs_map = _.groupBy(blogs, 'user.id')
  const users = Object.keys(id_blogs_map).map((id) => {
    return {
      id: id,
      number_of_blogs: id_blogs_map[id].length,
      name: id_blogs_map[id][0].user.name,
    }
  })

  return (
    <div>
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.number_of_blogs}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
