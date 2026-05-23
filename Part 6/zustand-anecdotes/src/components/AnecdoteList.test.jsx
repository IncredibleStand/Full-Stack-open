import { render, screen, act, cleanup } from '@testing-library/react'
import { describe, test, expect, vi, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import AnecdoteList from './AnecdoteList'
import { useAnecdoteControls } from '../store'
import anecdoteService from '../services/anecdotes'

afterEach(() => {
  cleanup()
})

vi.mock('../services/anecdotes')

describe('<AnecdoteList />', () => {
  test('renders anecdotes in descending order of votes', async () => {
    const messyData = [
      { id: '1', content: 'Low votes', votes: 1 },
      { id: '2', content: 'Highest votes', votes: 100 },
      { id: '3', content: 'Medium votes', votes: 50 }
    ]

    anecdoteService.getAll.mockResolvedValue(messyData)

    const TestWrapper = () => {
      const { initialize } = useAnecdoteControls()
      
      return (
        <div>
          <button onClick={initialize}>Load Data</button>
          <AnecdoteList />
        </div>
      )
    }

    render(<TestWrapper />)

    await act(async () => {
      screen.getByText('Load Data').click()
    })

    // Grab all the text elements that contain the word "has" 
    const voteElements = screen.getAllByText(/has \d+/)

    const renderedText = voteElements.map(el => el.textContent)

    expect(renderedText[0]).toContain('has 100')
    expect(renderedText[1]).toContain('has 50')
    expect(renderedText[2]).toContain('has 1')
  })

  test('renders only anecdotes that match the filter', async () => {
    const mockData = [
      { id: '1', content: 'Apple pie is good', votes: 0 },
      { id: '2', content: 'Banana split is sweet', votes: 0 },
      { id: '3', content: 'Apple juice is refreshing', votes: 0 }
    ]
    
    anecdoteService.getAll.mockResolvedValue(mockData)

    const TestWrapper = () => {
      const { initialize, setFilter } = useAnecdoteControls()
      return (
        <div>
          <button onClick={initialize}>Load</button>
          <button onClick={() => setFilter('apple')}>Apply Filter</button>
          <AnecdoteList />
        </div>
      )
    }

    render(<TestWrapper />)

    await act(async () => {
      screen.getByText('Load').click()
    })

    await act(async () => {
      screen.getByText('Apply Filter').click()
    })

    // We use 'queryByText' when checking if something is MISSING,
    // because 'getByText' will crash the test if it can't find it!
    expect(screen.queryByText('Banana split is sweet')).toBeNull() 
    
    // We use 'getByText' when we EXPECT it to be there
    expect(screen.getByText('Apple pie is good')).toBeDefined()
    expect(screen.getByText('Apple juice is refreshing')).toBeDefined()
  })

  test('voting increases the number of votes', async () => {
    const mockData = [
      { id: '1', content: 'Testing votes', votes: 0 }
    ]
    anecdoteService.getAll.mockResolvedValue(mockData)

    anecdoteService.update.mockResolvedValue({ 
      id: '1', 
      content: 'Testing votes', 
      votes: 1 
    })

    const TestWrapper = () => {
      const { initialize, setFilter } = useAnecdoteControls() 
      
      const handleLoad = () => {
        initialize()
        setFilter('')
      }

      return (
        <div>
          <button onClick={handleLoad}>Load</button> 
          <AnecdoteList />
        </div>
      )
    }

    render(<TestWrapper />)
    const user = userEvent.setup()

    // Note: userEvent uses act automatically
    await user.click(screen.getByText('Load'))

    const initialVoteText = await screen.findByText(/has 0/)
    expect(initialVoteText).toBeDefined()

    const voteButton = screen.getByText('vote')
    await user.click(voteButton)

    const updatedVoteText = await screen.findByText(/has 1/)
    expect(updatedVoteText).toBeDefined()
  })
})