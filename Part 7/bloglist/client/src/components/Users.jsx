import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import userService from '../services/users'

// --- REFINED STYLED COMPONENTS ---
const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 20px;
`

const PageTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
`

const TableWrapper = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  overflow: hidden;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`

const Th = styled.th`
  padding: 18px 24px;
  background-color: #f8fafc;
  color: #475569;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e2e8f0;
`

const Tr = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }

  &:last-child td {
    border-bottom: none;
  }
`

const Td = styled.td`
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  font-size: 15px;

  a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;

    &:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
  }
`

const Badge = styled.span`
  background-color: #eff6ff;
  color: #1d4ed8;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 700;
`

const Users = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) {
    return (
      <PageContainer>
        <div>Loading users...</div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageTitle>Users Directory</PageTitle>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Username</Th>
              <Th>Blogs Created</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Link to={`/users/${user.id}`}>
                    {user.name || user.username}
                  </Link>
                </Td>
                <Td>{user.username}</Td>
                <Td>
                  <Badge>{user.blogs.length}</Badge>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </PageContainer>
  )
}

export default Users
