import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notification: null,

  // Action to set notification and handle the timeout
  setNotification: (message, type = 'success', timeout = 5000) => {
    set({ notification: { message, type } })

    setTimeout(() => {
      set({ notification: null })
    }, timeout)
  },

  clearNotification: () => set({ notification: null }),
}))
