# 🚨 INSTRUÇÕES URGENTES - REDEPLOY DO FRONTEND

## ❌ PROBLEMA ATUAL:
O frontend ainda está usando a variável de ambiente antiga. Nos logs vemos:
```
Making GET request to: /products
```

Deveria ser:
```
Making GET request to: https://cafeteria-backend-jgty.onrender.com/api/products
```

## ✅ SOLUÇÃO - REDEPLOY MANUAL OBRIGATÓRIO:

### PASSO 1: ACESSE O FRONTEND NO RENDER
1. Vá para: https://dashboard.render.com
2. Clique no serviço **`cafeteria-frontend`**
3. Você deve ver a URL: `https://cafeteria-frontend-0t1d.onrender.com`

### PASSO 2: VERIFICAR VARIÁVEIS DE AMBIENTE
1. Na página do serviço frontend, clique em **"Environment"**
2. Confirme se existe a variável:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://cafeteria-backend-jgty.onrender.com/api`

### PASSO 3: FORÇAR REDEPLOY
1. Clique no botão **"Manual Deploy"** (canto superior direito)
2. Aguarde o build completo (5-10 minutos)
3. Acompanhe os logs do build

### PASSO 4: VALIDAR APÓS REDEPLOY
Após o redeploy, teste:
1. Acesse: `https://cafeteria-frontend-0t1d.onrender.com/`
2. Abra o DevTools (F12)
3. Vá para a aba "Network"
4. Recarregue a página
5. Deve aparecer requisição para: `https://cafeteria-backend-jgty.onrender.com/api/products`

## 🔍 COMO IDENTIFICAR SE FUNCIONOU:

### ✅ SUCESSO:
- Frontend carrega sem erro
- Produtos aparecem na tela
- No DevTools: requisições para `https://cafeteria-backend-jgty.onrender.com/api/products`

### ❌ AINDA COM PROBLEMA:
- Erro "Erro ao conectar com o servidor"
- No DevTools: requisições para `/products` (sem URL completa)

## 🚨 SE A VARIÁVEL NÃO EXISTIR:
1. Na página do frontend, clique em **"Environment"**
2. Clique em **"Add Environment Variable"**
3. **Key**: `REACT_APP_API_URL`
4. **Value**: `https://cafeteria-backend-jgty.onrender.com/api`
5. Clique em **"Save Changes"**
6. Faça o **"Manual Deploy"**

## 📋 CHECKLIST FINAL:
- [ ] Acessei o serviço `cafeteria-frontend` no Render
- [ ] Verifiquei a variável `REACT_APP_API_URL`
- [ ] Fiz o "Manual Deploy"
- [ ] Aguardei o build completo
- [ ] Testei o frontend
- [ ] Confirmei que as requisições vão para a URL correta

## 🎯 RESULTADO ESPERADO:
Após seguir estes passos, sua aplicação Cafeteria estará 100% funcional e pública!

**Status**: ⏳ AGUARDANDO REDEPLOY MANUAL DO FRONTEND
