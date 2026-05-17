import { renderHook, act, cleanup } from '@testing-library/react'
import { vi, describe, test, expect, afterEach } from 'vitest'
import { useAnecdotes, useAnecdoteControls } from './store'
import anecdoteService from './services/anecdotes'

afterEach(() => {
  cleanup()
})

// Hijack the API service
vi.mock('./services/anecdotes')

describe('Anecdote Store', () => {
  test('initializes state with anecdotes from the backend', async () => {
    const fakeDbResponse = [
      { id: '1', content: 'Testing is cool', votes: 0 },
      { id: '2', content: 'Zustand is awesome', votes: 0 }
    ]
    
    // Tell our hijacked service to return the fake data when getAll() is called
    anecdoteService.getAll.mockResolvedValue(fakeDbResponse)

    // Mount our hooks using React Testing Library
    const { result: controls } = renderHook(() => useAnecdoteControls())
    const { result: state } = renderHook(() => useAnecdotes())

    await act(async () => {
      await controls.current.initialize()
    })

    expect(state.current).toEqual(fakeDbResponse)
  })
})