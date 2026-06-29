import { useState } from 'react'
import styled from 'styled-components'

const FormWrapper = styled.div`
  max-width: 500px;
  margin: 20px 0;
`

const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 24px;
`

const InputGroup = styled.div`
  margin-bottom: 16px;

  input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-sizing: border-box;
    transition: border-color 0.2s;
    outline: none;

    &:focus {
      border-color: #1a73e8;
    }

    &::placeholder {
      color: #9ca3af;
    }
  }
`

const Button = styled.button`
  background-color: #1a73e8;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: #1557b0;
  }
`

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <FormWrapper>
      <FormTitle>create new</FormTitle>
      <form onSubmit={addBlog}>
        <InputGroup>
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
        </InputGroup>
        <InputGroup>
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </InputGroup>
        <InputGroup>
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </InputGroup>
        <Button type="submit">create</Button>
      </form>
    </FormWrapper>
  )
}

export default BlogForm
