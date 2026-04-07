# 🎯 Comandos Rápidos

## Terminal 1 - Backend

```powershell
cd backend
npm run dev
```

**Esperado**: `Servidor escutando na porta 3000`

## Terminal 2 - Frontend

```powershell
cd frontend
npm run dev
```

**Esperado**: Abre automaticamente `http://localhost:5173`

## ✅ Como Testar

1. Preencha **Peso**: `70`
2. Preencha **Altura**: `1.75`
3. Clique **Calcular IMC**
4. Deve retornar: `IMC: 22.86` e `Classificação: Normal`

## 🧪 Testar Error Boundary

1. Abra DevTools (F12)
2. No Console, Execute:
   ```javascript
   throw new Error("Teste de Error Boundary");
   ```
3. Deve aparecer a tela de erro com opção de tentar novamente

## 🧪 Testar Validações

- **Deixar campo vazio**: `"Por favor, preencha todos os campos"`
- **Altura 0.3m**: `"Altura deve estar entre 0.5m e 2.5m"`
- **Peso -50kg**: `"Peso e altura devem ser maiores que zero"`
- **Altura negativa**: `"Peso e altura devem ser maiores que zero"`

## 📊 Classificações e Cores

| Classificação | IMC       | Cor      | Bootstrap       |
| ------------- | --------- | -------- | --------------- |
| Magreza       | < 18.5    | Amarelo  | `alert-warning` |
| Normal        | 18.5-24.9 | Verde    | `alert-success` |
| Sobrepeso     | 24.9-30   | Amarelo  | `alert-warning` |
| Obesidade     | > 30      | Vermelho | `alert-danger`  |

## 🛑 Parar os Servidores

```powershell
# No Power Shell, pressione Ctrl+C
# ou execute:
Get-Process -Name node | Stop-Process -Force
```

## 📝 Arquivos Importantes

- Frontend: `frontend/src/components/IMCForm.jsx` - Lógica principal
- Error Boundary: `frontend/src/components/ErrorBoundary.jsx`
- Config: `frontend/.env` - Variáveis de ambiente
- Config: `frontend/vite.config.js` - Configuração Vite

---

**Tudo pronto! 🚀**
