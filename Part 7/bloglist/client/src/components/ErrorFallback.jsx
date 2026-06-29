import styled from 'styled-components'

const ErrorContainer = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  padding: 32px;
  margin-top: 32px;
  margin-bottom: 32px;
  text-align: center;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

const ErrorTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #991b1b;
  margin: 0;
  margin-bottom: 12px;
`

const ErrorText = styled.p`
  font-size: 16px;
  color: #7f1d1d;
  margin: 0;
  margin-bottom: 24px;
`

const ReloadButton = styled.button`
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b91c1c;
  }
`

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <ErrorContainer>
      <ErrorTitle>Something went wrong</ErrorTitle>
      <ErrorText>
        {error.message || 'An unexpected rendering error occurred.'}
      </ErrorText>
      <ReloadButton onClick={resetErrorBoundary}>Try Again</ReloadButton>
    </ErrorContainer>
  )
}

export default ErrorFallback
