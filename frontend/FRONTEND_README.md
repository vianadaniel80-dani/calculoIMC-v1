# Frontend com React + Vite

## ✨ Melhorias Implementadas

- **Vite**: Build tool moderno e rápido
- **React**: Framework para UI componentizada
- **Error Boundaries**: Tratamento de erros a nível de componentes
- **Validação Robusta**: Validações no frontend antes de enviar para API
- **Estados Melhorados**: Gerenciamento de loading e erro
- **Axios**: Cliente HTTP melhorado com melhor tratamento de erros
- **Variáveis de Ambiente**: Configuração flexível da API URL
- **Bootstrap 5**: Styling responsivo

## 🚀 Instalação

1. Entre na pasta frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

## 📝 Configuração

Crie um arquivo `.env` na pasta frontend (ou use o `.env.example` como base):

```
VITE_API_URL=http://localhost:3000
```

## 🏃 Execução

### Modo Desenvolvimento

```bash
npm run dev
```

A aplicação abrirá automaticamente em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Isso gera os arquivos otimizados em `frontend/dist/`

### Preview da Build

```bash
npm run preview
```

## 📂 Estrutura

```
frontend/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx    # Captura erros de componentes
│   │   └── IMCForm.jsx          # Formulário principal
│   ├── App.jsx                  # Componente raiz
│   ├── main.jsx                 # Ponto de entrada React
│   └── index.css                # Estilos globais
├── index.html                   # HTML base
├── vite.config.js               # Configuração Vite
├── package.json                 # Dependências
└── .env                         # Variáveis de ambiente
```

## 🛡️ Error Boundary

O `ErrorBoundary` captura:

- Erros de renderização de componentes
- Erros em lifecycle methods
- Erros em construtores
- Erros em funções de render

Quando um erro é capturado, exibe uma interface amigável ao usuário com opção de tentar novamente.

## 🔄 Fluxo de Validação

1. **Frontend**: Validação de inputs vazios, valores inválidos, ranges
2. **API Call**: Requisição com axios
3. **Backend**: Validação adicional no servidor
4. **Resposta**: Tratamento de sucesso ou erro
5. **Erro Boundary**: Captura qualquer erro não previsto

## 📋 Funcionalidades

✅ Cálculo de IMC com Backend Express
✅ Feedback visual com cores (Magreza, Normal, Sobrepeso, Obesidade)
✅ Validação robusta de entrada
✅ Loading states
✅ Tratamento de erros com mensagens amigáveis
✅ Error Boundaries para erros críticos
✅ Descrições de classificações
✅ Interface responsiva
