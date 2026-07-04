import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import userService from '../services/users'

// --- STYLED COMPONENTS ---
const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 16px;
`

const SubTitle = styled.h3`
  font-size: 20px;
  color: #374151;
  margin-bottom: 16px;
`

const BlogList = styled.ul`
  padding-left: 24px;
  color: #4b5563;
`

const BlogItem = styled.li`
  margin-bottom: 8px;
  font-size: 16px;
`

const User = () => {
  const id = useParams().id

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) {
    return <div>Loading user data...</div>
  }

  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <Title>{user.name || user.username}</Title>
      <SubTitle>added blogs</SubTitle>
      <BlogList>
        {user.blogs.map((blog) => (
          <BlogItem key={blog.id}>{blog.title}</BlogItem>
        ))}
      </BlogList>
    </div>
  )
}

export default User
