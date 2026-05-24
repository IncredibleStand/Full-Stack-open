import { useCreateAnecdote } from '../hooks/useAnecdotes'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {

  const createMutation = useCreateAnecdote()
  const setNotification = useNotify()


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createMutation.mutate(
      { content, votes: 0 }, 
      {
        onSuccess: () => {
          event.target.anecdote.value = ''
          setNotification( `anecdote '${content}' created` )
        },
        onError: (error) => {
          setNotification(error.message)
        }
      }
    )
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