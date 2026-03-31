# Projeto: Calculadora de IMC (Web)

## Resumo para avaliação

Este projeto implementa uma calculadora de IMC (Indice de Massa Corporal) com arquitetura separada em **frontend** e **backend**, permitindo que o usuario informe peso e altura em uma interface web e receba o resultado do IMC com sua classificacao.

A aplicacao foi desenvolvida com foco em pratica de conceitos de desenvolvimento web, incluindo:

- consumo de API via `fetch`;
- criacao de rotas HTTP com Express;
- tratamento de erros com middlewares;
- validacao basica de dados de entrada;
- separacao de responsabilidades entre camadas.

## Objetivo do sistema

Permitir o calculo do IMC por meio de uma API REST simples, exibindo no frontend:

- valor do IMC (com 2 casas decimais);
- classificacao de acordo com faixas pre-definidas;
- feedback visual com cores diferentes para cada classificacao.

## Arquitetura atual

### Frontend

Pasta: `frontend/`

- `index.html`: estrutura da tela com formulario para peso e altura.
- `script.js`: captura os dados, envia requisicao `POST` para a API e renderiza o resultado na pagina.
- Biblioteca visual utilizada: Bootstrap (CDN).

### Backend

Pasta: `backend/`

- `server.js`: inicializacao do servidor, leitura de variavel de ambiente e tratamento de eventos de encerramento.
- `src/app.js`: configuracao do app Express (CORS, rotas e middlewares de erro).
- `src/routes/`: definicao dos endpoints.
- `src/controllers/imcController.js`: regra de negocio do calculo do IMC e classificacao.
- `src/errors/` e `src/middleware/`: padronizacao e tratamento centralizado de erros (incluindo 404).

## Fluxo de funcionamento

1. Usuario preenche peso e altura no formulario web.
2. Frontend envia `POST /calculoIMC` com JSON `{ peso, altura }`.
3. Controller do backend valida os dados e calcula `IMC = peso / (altura^2)`.
4. O backend retorna JSON com `imc` e `classificacao`.
5. Frontend exibe o resultado com estilo visual correspondente.

## Classificacao implementada

- **Magreza**: IMC < 18.5
- **Normal**: 18.5 <= IMC <= 24.9
- **Sobrepeso**: 24.9 < IMC <= 30
- **Obesidade**: IMC > 30

## Endpoints da API

- `GET /` -> retorna mensagem de status da API (`API IMC v1.0`)
- `POST /calculoIMC` -> recebe peso e altura e retorna o calculo do IMC

Exemplo de payload:

```json
{
  "peso": 85.5,
  "altura": 1.8
}
```

Exemplo de resposta de sucesso:

```json
{
  "imc": "26.39",
  "classificacao": "Sobrepeso"
}
```

## Como executar localmente

### Backend

Na pasta `backend/`:

1. Instalar dependencias: `npm install`
2. Iniciar em desenvolvimento: `npm run dev`

Servidor padrao: `http://localhost:3000`

### Frontend

Abrir o arquivo `frontend/index.html` no navegador (ou servir com uma extensao de servidor local).

## Conclusao

O projeto atende de forma básica ao objetivo principal de calcular IMC via aplicacao web integrada com API Node.js/Express.
