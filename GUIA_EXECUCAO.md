# 🚀 Guia de Execução - Projeto IMC (Frontend + Backend)

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn

## 🏗️ Estrutura

```
web-calculo-imc/
├── backend/          # Express API
└── frontend/         # React + Vite
```

## ⚙️ Passo 1: Preparar Backend

Abra um terminal PowerShell e navegue para a pasta backend:

```powershell
cd backend
npm install
npm run dev
```

O backend estará rodando em: `http://localhost:3000`

## 🎨 Passo 2: Preparar Frontend (em outro terminal)

Abra um novo terminal PowerShell e navegue para a pasta frontend:

```powershell
cd frontend
npm install
npm run dev
```

O frontend estará rodando em: `http://localhost:5173`

## ✅ Pronto!

Após ambos os servidores estarem rodando:

1. O navegador abrirá automaticamente em `http://localhost:5173`
2. Preencha peso (kg) e altura (m)
3. Clique em "Calcular IMC"
4. Veja o resultado com a classificação!

## 🔄 Fluxo Completo

```
Frontend (React)
    ↓ POST /calculoIMC
Backend (Express)
    ↓ Valida + Calcula
    ↓
Frontend recebe {imc, classificacao}
    ↓ Renderiza resultado
Usuário vê o resultado
```

## 💾 Build para Produção

### Frontend Build

```powershell
cd frontend
npm run build
```

Gera arquivos em `frontend/dist/`

## 🐛 Troubleshooting

### Erro "Porta 3000 já está em uso"

Matou o processo antigo:

```powershell
Get-Process -Name node | Stop-Process -Force
npm run dev
```

### Erro "Porta 5173 já está em uso"

```powershell
Get-Process -Name node | Stop-Process -Force
npm run dev
```

### CORS Error no Frontend

Verifique se:

1. Backend está rodando em `http://localhost:3000`
2. Arquivo `.env` do frontend tem: `VITE_API_URL=http://localhost:3000`
3. Reinicie o frontend após alterar `.env`

## 📚 Documentação Detalhada

- [Frontend README](./frontend/FRONTEND_README.md)
- [Backend estrutura](./backend/src)

## 🎯 Próximos Passos

- Adicionar testes automáticos
- Implementar persistência de dados
- Deploy em produção
- Melhorias de performance
- Adicionar histórico de cálculos
