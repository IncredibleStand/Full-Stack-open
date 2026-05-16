import { useAnecdotes, useFilter, useAnecdoteControls } from '../store'
import { useNotificationControls } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const { vote, deleteAnecdote } = useAnecdoteControls()
  const { showNotification } = useNotificationControls()

  const filteredAnecdotes = anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
  
  const sortedAnecdotes = filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)
  
  const handleVote = (anecdote) => {
    vote(anecdote.id)
    showNotification(`You voted for: '${anecdote.content}'`, 5)
  }

  const handleDelete = (anecdote) => {
    if (window.confirm(`Delete '${anecdote.content}'?`)) {
      deleteAnecdote(anecdote.id)
      // showNotification(`Deleted: '${anecdote.content}'`, 5)
    }
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id} style={{ marginBottom: '15px' }}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button style={{ marginLeft: '10px' }} onClick={() => handleVote(anecdote)}>
              vote
            </button>
            {/* ONLY render this button if votes are exactly 0 */}
            {anecdote.votes === 0 && (
              <button 
                style={{ marginLeft: '10px', color: 'red' }} 
                onClick={() => handleDelete(anecdote)}
              >
                delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList