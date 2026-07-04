// src/components/Notification.jsx
import styled from 'styled-components'
import { useNotificationStore } from '../store/notificationStore'

const NotificationContainer = styled.div`
  background: ${(props) => (props.$type === 'error' ? '#fde8e8' : '#eafaf1')};
  color: ${(props) => (props.$type === 'error' ? '#e53e3e' : '#2ecc71')};
  border: 1px solid
    ${(props) => (props.$type === 'error' ? '#f8b4b4' : '#a2e8dd')};
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 6px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
  span {
    margin-right: 8px;
  }
`

const Notification = () => {
  // Access the store directly
  const notification = useNotificationStore((state) => state.notification)

  if (!notification || !notification.message) return null

  return (
    <NotificationContainer $type={notification.type}>
      <span>{notification.type === 'success' ? '✓' : '⚠'}</span>
      {notification.message}
    </NotificationContainer>
  )
}

export default Notification
