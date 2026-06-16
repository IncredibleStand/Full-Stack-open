import styled from 'styled-components'

const NotificationContainer = styled.div`
  background: ${props => props.$type === 'error' ? '#fde8e8' : '#eafaf1'};
  color: ${props => props.$type === 'error' ? '#e53e3e' : '#2ecc71'};
  border: 1px solid ${props => props.$type === 'error' ? '#f8b4b4' : '#a2e8dd'};
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 6px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
`

const Notification = ({ message, type }) => {
  if (!message) return null

  return (
    <NotificationContainer $type={type}>
      {type === 'success' ? '✓ ' : '⚠ '}
      {message}
    </NotificationContainer>
  )
}

export default Notification