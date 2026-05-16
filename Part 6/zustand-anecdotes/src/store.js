import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const notesFromDb = await anecdoteService.getAll()
      set({ anecdotes: notesFromDb })
    },

    vote: async (id) => {
      const anecdoteToChange = get().anecdotes.find(a => a.id === id)
      const updatedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      const returnedAnecdote = await anecdoteService.update(id, updatedAnecdote)

      set((state) => ({
        anecdotes: state.anecdotes.map(a => 
          a.id === id ? returnedAnecdote : a
        )
      }))
    },
    
    createAnecdote: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set((state) => ({
        anecdotes: [...state.anecdotes, newAnecdote]
      }))
    },

    deleteAnecdote: async (id) => {
      await anecdoteService.remove(id)
  
      set((state) => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },

    setFilter: (newFilter) => set({ filter: newFilter })
  }
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteControls = () => useAnecdoteStore((state) => state.actions)