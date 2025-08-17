# Guia de Deploy no Render - Projeto Cafeteria

## Problemas Corrigidos

### 1. Configuração do render.yaml
- **Problema**: `runtime: node` estava incorreto
- **Solução**: Alterado para `env: node`

- **Problema**: `runtime: static` estava incorreto  
- **Solução**: Alterado para `env: static`

- **Problema**: Configuração incompleta do PostgreSQL
- **Solução**: Adicionados `databaseName` e `user` para o serviço pserv

- **Problema**: Build command tentava executar migrations inexistentes
- **Solução**: Removidos comandos de migration, pois o app usa `sequelize.sync()`

### 2. Estrutura Final do render.yaml

```yaml
services:
  - type: pserv
    name: cafeteria-db
    databaseName: cafeteria
    user: cafeteria_user
    plan: free

  - type: web
    name: cafeteria-backend
    env: node
    plan: free
    rootDir: Backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: cafeteria-db
          property: connectionString
      - key: FRONTEND_URL
        value: https://cafeteria-frontend.onrender.com

  - type: web
    name: cafeteria-frontend
    env: static
    plan: free
    rootDir: frontend
    buildCommand: npm install && npm run build
    staticPublishPath: build
    envVars:
      - key: REACT_APP_API_URL
        value: https://cafeteria-backend.onrender.com/api
```

## Como Funciona o Deploy

### 1. Banco de Dados (PostgreSQL)
- Render criará automaticamente um banco PostgreSQL gratuito
- A string de conexão será fornecida via `DATABASE_URL`
- O backend está configurado para usar SSL em produção

### 2. Backend (Node.js)
- Instala dependências com `npm install`
- Inicia com `npm start` (executa `node index.js`)
- O `index.js` automaticamente:
  - Sincroniza as tabelas com `sequelize.sync()`
  - Executa os seeders para popular o banco
  - Inicia o servidor na porta fornecida pelo Render

### 3. Frontend (React - Static)
- Instala dependências e faz build com `npm install && npm run build`
- Serve os arquivos estáticos da pasta `build`
- Configurado para apontar para a API do backend

## Passos para Deploy

1. **Commit e Push das alterações**:
   ```bash
   git add .
   git commit -m "Fix render.yaml configuration for deployment"
   git push origin main
   ```

2. **No Render Dashboard**:
   - Vá para https://render.com/
   - Clique em "New" → "Blueprint"
   - Conecte seu repositório GitHub
   - Selecione o branch `main`
   - O Render detectará automaticamente o `render.yaml`

3. **Aguarde o Deploy**:
   - O banco será criado primeiro
   - Depois o backend (pode demorar alguns minutos)
   - Por último o frontend

## URLs Finais

Após o deploy bem-sucedido:
- **Frontend**: `https://cafeteria-frontend.onrender.com`
- **Backend API**: `https://cafeteria-backend.onrender.com/api`
- **Health Check**: `https://cafeteria-backend.onrender.com/health`

## Verificações Pós-Deploy

1. **Teste o Health Check**:
   ```bash
   curl https://cafeteria-backend.onrender.com/health
   ```

2. **Teste a API de Produtos**:
   ```bash
   curl https://cafeteria-backend.onrender.com/api/products
   ```

3. **Acesse o Frontend**:
   - Abra `https://cafeteria-frontend.onrender.com`
   - Verifique se os produtos carregam
   - Teste fazer um pedido

## Troubleshooting

### Se o Backend não iniciar:
- Verifique os logs no Render Dashboard
- Confirme se a `DATABASE_URL` está sendo fornecida
- Verifique se todas as dependências estão no `package.json`

### Se o Frontend não carregar dados:
- Verifique se a `REACT_APP_API_URL` está correta
- Teste a API diretamente no navegador
- Verifique o console do navegador para erros de CORS

### Se houver erro de CORS:
- O backend já está configurado para aceitar requisições do Render
- Verifique se a `FRONTEND_URL` está correta no backend

## Monitoramento

- Os serviços gratuitos do Render "dormem" após 15 minutos de inatividade
- O primeiro acesso após "dormir" pode demorar 30-60 segundos
- Para manter ativo, considere usar um serviço de ping ou upgrade para plano pago

## Próximos Passos

1. Faça o commit das alterações
2. Execute o deploy no Render
3. Teste todas as funcionalidades
4. Compartilhe as URLs finais

O projeto agora está pronto para deploy no Render sem os erros anteriores!
