import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

  test('<BlogForm /> updates parent state and calls onSubmit with correct details', async () => {
    // Create the mock function to pass as the createBlog prop
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write blog title here')
    const authorInput = screen.getByPlaceholderText('write blog author here')
    const urlInput = screen.getByPlaceholderText('write blog url here')
    
    const sendButton = screen.getByText('create')

    // Simulate the user typing in all the fields
    await user.type(titleInput, 'Testing a form...')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'http://testform.com')
    
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)

    expect(createBlog.mock.calls[0][0]).toStrictEqual({
      title: 'Testing a form...',
      author: 'Test Author',
      url: 'http://testform.com'
    })
  })
