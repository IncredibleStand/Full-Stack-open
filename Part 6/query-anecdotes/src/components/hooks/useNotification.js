import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const useNotificationValue = () => useContext(NotificationContext)[0]
const useNotificationSetter = () => useContext(NotificationContext)[1]

export { useNotificationValue, useNotificationSetter }
