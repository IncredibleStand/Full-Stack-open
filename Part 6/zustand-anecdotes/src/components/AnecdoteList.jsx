import { useAnecdotes, useAnecdoteControls } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdoteControls()

  // Make a copy and sort by votes descending
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id} style={{ marginBottom: '15px' }}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button style={{ marginLeft: '10px' }} onClick={() => vote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList