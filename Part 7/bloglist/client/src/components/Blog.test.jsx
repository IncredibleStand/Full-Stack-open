import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing React components is fun',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 42,
    user: {
      name: 'Super User'
    }
  }

  test('renders title and author, but does not render URL or likes by default', () => {
    render(<Blog blog={blog} />)

    const titleAndAuthor = screen.getByText('Testing React components is fun Test Author', { exact: false })
    expect(titleAndAuthor).toBeDefined()

    const url = screen.queryByText('http://testurl.com')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes 42')
    expect(likes).toBeNull()
  })


  test('renders URL and likes when the view button is clicked', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('http://testurl.com')
    expect(url).toBeDefined()

    const likes = screen.getByText('likes 42', { exact: false })
    expect(likes).toBeDefined()
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const blog = {
      title: 'Testing React components is fun',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 42,
      user: { name: 'Super User' }
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} addLike={mockHandler} />)

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})