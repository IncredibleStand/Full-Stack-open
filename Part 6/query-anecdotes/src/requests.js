const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  fetch(baseUrl).then(res => res.json())

export const createAnecdote = (newAnecdote) =>
  fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }).then(async res => {
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error) 
    }
    return res.json()
  })

export const updateAnecdote = (updatedFields) =>
  fetch(`${baseUrl}/${updatedFields.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFields)
  }).then(res => res.json())