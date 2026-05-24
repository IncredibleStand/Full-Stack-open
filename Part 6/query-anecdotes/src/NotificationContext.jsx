import { createContext, useState, useContext, useRef } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)
  const timerRef = useRef(null)

  const displayNotification = (message) => {
    setNotification(message)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, displayNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context[0]
}

export const useNotify = () => {
  const context = useContext(NotificationContext)
  const displayNotification = context[1]

  return (message) => {
    displayNotification(message)
  }
}

export default NotificationContext