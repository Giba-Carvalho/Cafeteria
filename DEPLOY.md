# 🚀 Deploy no Render.com

Este guia explica como fazer o deploy da aplicação Cafeteria no Render.com.

## 📋 Pré-requisitos

1. Conta no [Render.com](https://render.com)
2. Repositório no GitHub com o código da aplicação
3. Código commitado e enviado para o GitHub

## 🔧 Configuração do Deploy

### Opção 1: Deploy Automático com render.yaml

1. **Faça o commit dos arquivos de configuração:**
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

2. **No Render Dashboard:**
   - Clique em "New +"
   - Selecione "Blueprint"
   - Conecte seu repositório GitHub
   - Selecione o repositório "Cafeteria"
   - O Render detectará automaticamente o arquivo `render.yaml`
   - Clique em "Apply"

### Opção 2: Deploy Manual

#### 1. Criar o Banco de Dados PostgreSQL

1. No Render Dashboard, clique em "New +"
2. Selecione "PostgreSQL"
3. Configure:
   - **Name**: `cafeteria-db`
   - **Database**: `cafeteria`
   - **User**: `cafeteria_user`
   - **Plan**: Free
4. Clique em "Create Database"
5. Anote a **Internal Database URL** que será gerada

#### 2. Deploy do Backend

1. No Render Dashboard, clique em "New +"
2. Selecione "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `cafeteria-backend`
   - **Root Directory**: `Backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Variáveis de Ambiente:**
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: [Cole a Internal Database URL do PostgreSQL]

6. Clique em "Create Web Service"

#### 3. Deploy do Frontend

1. No Render Dashboard, clique em "New +"
2. Selecione "Static Site"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `cafeteria-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && REACT_APP_API_URL=https://cafeteria-backend.onrender.com/api npm run build`
   - **Publish Directory**: `build`
   - **Plan**: Free

5. Clique em "Create Static Site"

## 🔗 URLs da Aplicação

Após o deploy, você terá:

- **Frontend**: `https://cafeteria-frontend.onrender.com`
- **Backend API**: `https://cafeteria-backend.onrender.com`
- **Database**: Interno (não acessível publicamente)

## ⚠️ Considerações Importantes

### Plano Gratuito do Render

- **Limitações**: 
  - 750 horas/mês de uso
  - Aplicação "dorme" após 15 minutos de inatividade
  - Primeiro acesso após "dormir" pode demorar 30-60 segundos

### Banco de Dados

- **PostgreSQL Gratuito**:
  - 1GB de armazenamento
  - Conexões limitadas
  - Backup automático por 7 dias

### Performance

- **Cold Start**: Primeira requisição após inatividade pode ser lenta
- **Região**: Servidores nos EUA (latência para Brasil ~150-200ms)

## 🐛 Solução de Problemas

### Backend não inicia

1. Verifique os logs no Render Dashboard
2. Confirme se a `DATABASE_URL` está configurada
3. Verifique se todas as dependências estão no `package.json`

### Frontend não carrega

1. Verifique se a `REACT_APP_API_URL` está correta
2. Confirme se o build foi executado com sucesso
3. Verifique os logs de build

### Erro de CORS

1. Confirme se o domínio do frontend está no CORS do backend
2. Verifique se as URLs estão corretas (https vs http)

### Banco de dados não conecta

1. Verifique se a `DATABASE_URL` está correta
2. Confirme se o banco PostgreSQL está rodando
3. Verifique os logs de conexão

## 🔄 Atualizações

Para atualizar a aplicação:

1. Faça as alterações no código
2. Commit e push para o GitHub
3. O Render fará o redeploy automaticamente

## 📊 Monitoramento

- **Logs**: Disponíveis no Render Dashboard
- **Métricas**: CPU, memória e requisições
- **Alertas**: Configuráveis por email

## 💡 Dicas

1. **Mantenha a aplicação ativa**: Faça requisições regulares para evitar o "sleep"
2. **Otimize o build**: Remova dependências desnecessárias
3. **Use CDN**: Para assets estáticos grandes
4. **Monitore**: Acompanhe logs e métricas regularmente

---

**Status**: ✅ **PRONTO PARA DEPLOY**

A aplicação está configurada e pronta para ser deployada no Render.com!
