import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'

// Components
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback'
import NotFound from './components/NotFound'

// Services
import blogService from './services/blogs'

// Zustand Stores
import { useNotificationStore } from './store/notificationStore'
import { useUserStore } from './store/userStore'

// --- STYLED COMPONENTS FOR LAYOUT & LOGIN ---
const PageContainer = styled.div`
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const NavBar = styled.nav`
  background-color: #1a73e8;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
`

const NavBrand = styled.div`
  color: white;
  font-size: 22px;
  font-weight: bold;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`

const StyledNavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-right: 24px;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`

const UserSection = styled.span`
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
`

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: white;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 16px;
  transition: all 0.2s;

  &:hover {
    background: white;
    color: #1a73e8;
  }
`

const ContentHeader = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 20px;
`

const BlogList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`

const BlogListItem = styled.li`
  margin-bottom: 12px;

  a {
    display: block;
    padding: 16px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    color: #1a73e8;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      background: #f3f4f6;
      border-color: #d1d5db;
      transform: translateY(-1px);
    }
  }
`

const LoginFormWrapper = styled.div`
  max-width: 400px;
  margin: 60px auto;
  padding: 32px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;

  input {
    width: 100%;
    padding: 12px 0;
    font-size: 16px;
    border: none;
    border-bottom: 2px solid #e5e7eb;
    margin-bottom: 24px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #1a73e8;
    }
  }
`

const FormButton = styled.button`
  width: 100%;
  background-color: #1a73e8;
  color: white;
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #1557b0;
  }
`

// --- MAIN COMPONENT ---
const App = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Local Form State
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Zustand State
  const setNotification = useNotificationStore((state) => state.setNotification)
  const user = useUserStore((state) => state.user)
  const initializeUser = useUserStore((state) => state.initializeUser)
  const login = useUserStore((state) => state.login)
  const logout = useUserStore((state) => state.logout)

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  // --- REACT QUERY: FETCHING ---
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  // --- REACT QUERY: MUTATIONS ---
  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      navigate('/')
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success'
      )
    },
    onError: () => {
      setNotification('Failed to add blog', 'error')
    },
  })

  const updateLikeMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: () => {
      setNotification('Error updating likes', 'error')
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification('Blog removed successfully', 'success')
      navigate('/')
    },
    onError: () => {
      setNotification('Failed to delete blog', 'error')
    },
  })

  // --- HANDLERS ---
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await login({ username, password })
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      setNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleRemoveBlog = (id) => {
    const blogToDelete = blogs.find((b) => b.id === id)
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      deleteBlogMutation.mutate(id)
    }
  }

  // --- RENDER ---
  if (isLoading) {
    return (
      <PageContainer>
        <div>Loading data...</div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <NavBar>
        <NavBrand>Blog App</NavBrand>
        <NavLinks>
          <StyledNavLink to="/">blogs</StyledNavLink>
          {user && <StyledNavLink to="/create">new blog</StyledNavLink>}
          {user ? (
            <UserSection>
              {user.name} logged in{' '}
              <LogoutButton onClick={handleLogout}>logout</LogoutButton>
            </UserSection>
          ) : (
            <StyledNavLink to="/login">login</StyledNavLink>
          )}
        </NavLinks>
      </NavBar>

      <Notification />

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ContentHeader>blogs</ContentHeader>
                <BlogList>
                  {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <BlogListItem key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                          {blog.title} by {blog.author}
                        </Link>
                      </BlogListItem>
                    ))}
                </BlogList>
              </div>
            }
          />
          <Route
            path="/create"
            element={
              user ? (
                <BlogForm
                  createBlog={(blogObject) =>
                    createBlogMutation.mutate(blogObject)
                  }
                />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <BlogView
                blogs={blogs}
                addLike={(id, updatedBlog) =>
                  updateLikeMutation.mutate({ id, updatedBlog })
                }
                removeBlog={handleRemoveBlog}
                user={user}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginFormWrapper>
                <ContentHeader
                  style={{ textAlign: 'center', fontSize: '26px' }}
                >
                  Log in to application
                </ContentHeader>
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    value={username}
                    placeholder="username"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  <input
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  <FormButton type="submit">login</FormButton>
                </form>
              </LoginFormWrapper>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </PageContainer>
  )
}

export default App
