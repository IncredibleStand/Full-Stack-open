import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import userService from '../services/users'

// --- STYLED COMPONENTS ---
const PageTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 24px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`

const Th = styled.th`
  text-align: left;
  padding: 16px;
  background-color: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
  color: #374151;
  font-weight: bold;
`

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;

  a {
    color: #1a73e8;
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Users = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) {
    return <div>Loading users...</div>
  }

  return (
    <div>
      <PageTitle>Users</PageTitle>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Username</Th>
            <Th>Blogs created</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Td>
                <Link to={`/users/${user.id}`}>
                  {user.name || user.username}
                </Link>
              </Td>
              <Td>{user.username}</Td>
              <Td>{user.blogs.length}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
