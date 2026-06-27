import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id || blog.user
    }
    addLike(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    removeBlog(blog.id)
  }

  const showRemoveButton = blog.user?.username === currentUser?.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {showRemoveButton && (
            <button onClick={handleDelete} style={{ backgroundColor: 'lightblue', color: 'black', border: 'none', padding: '5px', borderRadius: '3px' }}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog