import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCreateAnecdote } from '../hooks/useAnecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createMutation = useCreateAnecdote()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm