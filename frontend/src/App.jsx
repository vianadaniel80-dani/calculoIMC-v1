import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import IMCForm from './components/IMCForm'

function App() {
  return (
    <ErrorBoundary>
      <IMCForm />
    </ErrorBoundary>
  )
}

export default App
