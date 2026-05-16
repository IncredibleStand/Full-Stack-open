import { useAnecdoteControls } from '../store'
import { useNotificationControls } from '../notificationStore'

const AnecdoteForm = () => {
  const { createAnecdote } = useAnecdoteControls()
  const { showNotification } = useNotificationControls()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
      
    createAnecdote(content)
    showNotification(`You created: '${content}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm