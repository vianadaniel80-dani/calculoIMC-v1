import React, { useState } from 'react'
import axios from 'axios'

const IMCForm = () => {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [resultado, setResultado] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const determinarCor = (classificacao) => {
    switch (classificacao) {
      case 'Magreza':
        return 'warning'
      case 'Normal':
        return 'success'
      case 'Sobrepeso':
        return 'warning'
      case 'Obesidade':
        return 'danger'
      default:
        return 'info'
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro(null)
    setCarregando(true)

    // Validações básicas no frontend
    if (!peso || !altura) {
      setErro('Por favor, preencha todos os campos')
      setCarregando(false)
      return
    }

    const pesoNum = parseFloat(peso)
    const alturaNum = parseFloat(altura)

    if (pesoNum <= 0 || alturaNum <= 0) {
      setErro('Peso e altura devem ser maiores que zero')
      setCarregando(false)
      return
    }

    if (alturaNum < 0.5 || alturaNum > 2.5) {
      setErro('Altura deve estar entre 0.5m e 2.5m')
      setCarregando(false)
      return
    }

    if (pesoNum < 2 || pesoNum > 300) {
      setErro('Peso deve estar entre 2kg e 300kg')
      setCarregando(false)
      return
    }

    try {
      const response = await axios.post(`${API_URL}/calculoIMC`, {
        peso: pesoNum,
        altura: alturaNum,
      })

      setResultado(response.data)
      setPeso('')
      setAltura('')
    } catch (err) {
      if (err.response?.data?.message) {
        setErro(err.response.data.message)
      } else if (err.message) {
        setErro(`Erro ao conectar com a API: ${err.message}`)
      } else {
        setErro('Erro desconhecido ao calcular IMC')
      }
      console.error('Erro na requisição:', err)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4">Calculadora de IMC</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="peso" className="form-label">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-control"
                    id="peso"
                    placeholder="Ex: 85.5"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    disabled={carregando}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="altura" className="form-label">
                    Altura (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="altura"
                    placeholder="Ex: 1.80"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    disabled={carregando}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={carregando}
                >
                  {carregando ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Calculando...
                    </>
                  ) : (
                    'Calcular IMC'
                  )}
                </button>
              </form>

              {erro && (
                <div className="alert alert-danger mt-3" role="alert">
                  <strong>Erro:</strong> {erro}
                </div>
              )}

              {resultado && (
                <div
                  className={`alert mt-3 alert-${determinarCor(resultado.classificacao)}`}
                  role="alert"
                >
                  <h5 className="alert-heading">Resultado</h5>
                  <p className="mb-0">
                    <strong>IMC:</strong> {resultado.imc}
                  </p>
                  <p className="mb-0">
                    <strong>Classificação:</strong> {resultado.classificacao}
                  </p>
                  <hr />
                  <small>
                    {getClassificacaoDescricao(resultado.classificacao)}
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getClassificacaoDescricao = (classificacao) => {
  const descricoes = {
    Magreza: 'Você está abaixo do peso. Consult um nutricionista.',
    Normal: 'Você está com peso normal. Mantenha os hábitos saudáveis!',
    Sobrepeso: 'Você está com sobrepeso. Considere praticar exercícios.',
    Obesidade: 'Você está com obesidade. Procure orientação médica.',
  }
  return descricoes[classificacao] || 'Resultado desconhecido'
}

export default IMCForm
