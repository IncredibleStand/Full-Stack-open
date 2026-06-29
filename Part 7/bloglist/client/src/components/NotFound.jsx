import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NotFoundContainer = styled.div`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 48px 32px;
  margin-top: 32px;
  margin-bottom: 32px;
  text-align: center;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

const NotFoundTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  margin-bottom: 16px;
`

const NotFoundText = styled.p`
  font-size: 16px;
  color: #4b5563;
  margin: 0;
  margin-bottom: 32px;
`

const HomeLink = styled(Link)`
  display: inline-block;
  background-color: #3b82f6;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
`

const NotFound = () => {
  return <NotFoundTitle>404 - Page not found</NotFoundTitle>
}

export default NotFound
