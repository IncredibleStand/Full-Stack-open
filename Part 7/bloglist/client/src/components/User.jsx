import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import userService from '../services/users'

// --- REFINED STYLED COMPONENTS ---
const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 40px auto 0;
`

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`

const AvatarPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
`

const Title = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px 0;
`

const UsernameLabel = styled.p`
  font-size: 16px;
  color: #64748b;
  margin: 0 0 32px 0;
`

const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #334155;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f1f5f9;
`

const BlogGrid = styled.div`
  display: flex;
  flex-direction: column;
  /* Replacing gap with explicit bottom margin on children */
`

const BlogCard = styled(Link)`
  display: block;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 16px 20px;
  border-radius: 8px;
  color: #1e293b;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 12px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: #ffffff;
    border-color: #cbd5e1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
    color: #2563eb;
  }
`

const EmptyState = styled.div`
  color: #94a3b8;
  font-style: italic;
  padding: 20px 0;
`

const User = () => {
  const id = useParams().id

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) {
    return <ProfileContainer>Loading profile...</ProfileContainer>
  }

  const user = users.find((u) => u.id === id)

  if (!user) {
    return <ProfileContainer>User not found.</ProfileContainer>
  }

  // Get first initial for the avatar
  const initial = (user.name || user.username).charAt(0).toUpperCase()

  return (
    <ProfileContainer>
      <ProfileCard>
        <AvatarPlaceholder>{initial}</AvatarPlaceholder>
        <Title>{user.name || user.username}</Title>
        <UsernameLabel>@{user.username}</UsernameLabel>

        <SubTitle>Added Blogs</SubTitle>

        {user.blogs.length > 0 ? (
          <BlogGrid>
            {user.blogs.map((blog) => (
              <BlogCard key={blog.id} to={`/blogs/${blog.id}`}>
                {blog.title}
              </BlogCard>
            ))}
          </BlogGrid>
        ) : (
          <EmptyState>This user hasn't added any blogs yet.</EmptyState>
        )}
      </ProfileCard>
    </ProfileContainer>
  )
}

export default User
