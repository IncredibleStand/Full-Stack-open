// src/store/userStore.js
import { create } from 'zustand'
import blogService from '../services/blogs'
import loginService from '../services/login'

export const useUserStore = create((set) => ({
  user: null,

  initializeUser: () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON)
      blogService.setToken(userObject.token)
      set({ user: userObject })
    }
  },

  login: async (credentials) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    set({ user })
  },

  logout: () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    set({ user: null })
  },
}))
