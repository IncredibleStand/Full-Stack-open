// src/components/BlogView.jsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  max-width: 650px;
  margin-top: 24px;
`

const Title = styled.h2`
  font-size: 32px;
  margin: 0 0 16px 0;
  color: #111827;
`

const Author = styled.div`
  font-size: 18px;
  color: #4b5563;
  margin-bottom: 12px;
`

const LinkAnchor = styled.a`
  color: #1a73e8;
  text-decoration: none;
  font-size: 16px;
  word-break: break-all;
  display: inline-block;
  margin-bottom: 16px;

  &:hover {
    text-decoration: underline;
  }
`

const MetaInfo = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
`

const ButtonGroup = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`

const LikesCounter = styled.span`
  font-size: 16px;
  margin-right: 16px;
  color: #111827;
`

const ActionButton = styled.button`
  background: white;
  border: 1px solid ${(props) => (props.$danger ? '#ff8a8a' : '#3b82f6')};
  color: ${(props) => (props.$danger ? '#ef4444' : '#1a73e8')};
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  margin-right: 12px;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.$danger ? '#fef2f2' : '#f0f7ff')};
    border-color: ${(props) => (props.$danger ? '#ef4444' : '#1a73e8')};
  }
`
const CommentsSection = styled.div`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f3f4f6;
`

const CommentsTitle = styled.h3`
  font-size: 20px;
  color: #111827;
  margin-bottom: 16px;
`

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  input {
    flex: 1;
    padding: 8px 20px;
    font-size: 15px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    margin-right: 12px; /* Explicit margin used for spacing */
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #1a73e8;
    }
  }
`

const CommentButton = styled.button`
  background: #1a73e8;
  color: white;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
`

const CommentList = styled.ul`
  padding-left: 24px;
  color: #4b5563;
`

const CommentItem = styled.li`
  margin-bottom: 8px;
  font-size: 15px;
`

const BlogView = ({ blogs, addLike, removeBlog, addComment, user }) => {
  const [commentInput, setCommentInput] = useState('')
  const id = useParams().id
  const navigate = useNavigate()

  const blog = blogs.find((b) => b.id === id)
  if (!blog) return null

  const handleLike = () => {
    if (!user) return
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id || blog.user,
    }
    addLike(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    removeBlog(blog.id)
    navigate('/')
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!commentInput.trim()) return

    addComment(blog.id, commentInput)
    setCommentInput('')
  }

  return (
    <Card>
      <Title>{blog.title}</Title>
      <Author>by {blog.author}</Author>

      <div>
        <LinkAnchor href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </LinkAnchor>
      </div>

      <ButtonGroup>
        <LikesCounter>
          <strong>{blog.likes}</strong> likes
        </LikesCounter>
        {user && <ActionButton onClick={handleLike}>like</ActionButton>}
        {user && (
          <ActionButton $danger onClick={handleDelete}>
            remove
          </ActionButton>
        )}
      </ButtonGroup>

      <MetaInfo>Added by {blog.user?.name || 'Anonymous'}</MetaInfo>

      <CommentsSection>
        <CommentsTitle>comments</CommentsTitle>

        <CommentForm onSubmit={handleAddComment}>
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="add a comment"
          />
          <CommentButton type="submit">add comment</CommentButton>
        </CommentForm>

        {blog.comments && blog.comments.length > 0 ? (
          <CommentList>
            {blog.comments.map((comment, index) => (
              <CommentItem key={index}>{comment}</CommentItem>
            ))}
          </CommentList>
        ) : (
          <p
            style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '14px' }}
          >
            No comments yet.
          </p>
        )}
      </CommentsSection>
    </Card>
  )
}

export default BlogView
