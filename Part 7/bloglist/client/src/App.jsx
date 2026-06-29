import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback'
import NotFound from './components/NotFound'

// --- STYLED COMPONENTS FOR LAYOUT & LOGIN ---
const PageContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
  border: 1px solid rgba(255,255,255,0.6);
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
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background-color: #1557b0;
  }
`

// --- MAIN COMPONENT ---
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })
  
  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))  
  }, [])

const [user, setUser] = useState(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const userObject = JSON.parse(loggedUserJSON)
    // Synchronously configure your token configuration during initialization
    blogService.setToken(userObject.token)
    return userObject
  }
  return null
})
  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    navigate('/')
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      navigate('/')
      notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
    } catch {
      notify('Failed to add blog', 'error')
    }
  }

  const addLike = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch {
      notify('Error updating likes', 'error')
    }
  }

  const removeBlog = async (id) => {
    const blogToDelete = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        notify('Blog removed successfully', 'success')
      } catch {
        notify('Failed to delete blog', 'error')
      }
    }
  }

  return (
    <PageContainer>
      <NavBar>
        <NavBrand>Blog App</NavBrand>
        <NavLinks>
          <StyledNavLink to="/">blogs</StyledNavLink>
          {user && <StyledNavLink to="/create">new blog</StyledNavLink>}
          {user 
            ? <UserSection>{user.name} logged in <LogoutButton onClick={handleLogout}>logout</LogoutButton></UserSection>
            : <StyledNavLink to="/login">login</StyledNavLink>
          }
        </NavLinks>
      </NavBar>

      <Notification message={notification.message} type={notification.type} />

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // This runs when the "Try Again" button is clicked.
          // You can reset specific states here, or just force a hard reload:
          window.location.reload()
        }}
      >
        <Routes>
          <Route path="/" element={
            <div>
              <ContentHeader>blogs</ContentHeader>
              <BlogList>
                {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
                  <BlogListItem key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} by {blog.author}
                    </Link>
                  </BlogListItem>
                )}
              </BlogList>
            </div>
          } />

          <Route path="/create" element={
            user ? <BlogForm createBlog={addBlog} /> : <Navigate replace to="/login" />
          } />

          <Route path="/blogs/:id" element={
            <BlogView blogs={blogs} addLike={addLike} removeBlog={removeBlog} user={user} />
          } />
          
          <Route path="/login" element={
            <LoginFormWrapper>
              <ContentHeader style={{ textAlign: 'center', fontSize: '26px' }}>Log in to application</ContentHeader>
              <form onSubmit={handleLogin}>
                <input 
                  type="text" value={username} placeholder="username"
                  onChange={({ target }) => setUsername(target.value)} 
                />
                <input 
                  type="password" value={password} placeholder="password"
                  onChange={({ target }) => setPassword(target.value)} 
                />
                <FormButton type="submit">login</FormButton>
              </form>
            </LoginFormWrapper>
          } />

        {/* The splat route must be at the bottom to catch all undefined paths */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </PageContainer>
  )
}

export default App