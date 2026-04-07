import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erro capturado pelo Error Boundary:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Erro na Aplicação!</h4>
            <p>
              Desculpe, ocorreu um erro inesperado. Por favor, tente novamente.
            </p>
            {this.state.error && (
              <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
                <summary>Detalhes do erro:</summary>
                <p>{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <p>{this.state.errorInfo.componentStack}</p>
                )}
              </details>
            )}
            <button
              className="btn btn-danger mt-3"
              onClick={this.handleReset}
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
