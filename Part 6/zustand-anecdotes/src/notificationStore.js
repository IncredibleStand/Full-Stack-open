import { create } from 'zustand'

let timeoutId = null 

const useNotificationStore = create((set) => ({
  message: '',
  
  actions: {
    showNotification: (text, seconds = 5) => {
      set({ message: text })
      
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      timeoutId = setTimeout(() => {
        set({ message: '' })
      }, seconds * 1000)
    }
  }
}))

export const useNotification = () => useNotificationStore(state => state.message)
export const useNotificationControls = () => useNotificationStore(state => state.actions)