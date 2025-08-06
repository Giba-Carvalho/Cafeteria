# ☕ Cafeteria - Sistema de Pedidos Online

Uma aplicação completa de cafeteria com frontend React e backend Node.js, permitindo visualizar produtos, adicionar ao carrinho e fazer pedidos.

## 🚀 Funcionalidades

### Frontend (React)
- ✅ Interface moderna e responsiva
- ✅ Catálogo de produtos com imagens
- ✅ Carrinho de compras interativo
- ✅ Formulário de pedidos com validação
- ✅ Comunicação em tempo real com o backend
- ✅ Design atrativo com tema de cafeteria

### Backend (Node.js + Express)
- ✅ API RESTful completa
- ✅ Banco de dados SQLite (desenvolvimento)
- ✅ Modelos Sequelize (Product, Order, OrderItem)
- ✅ Seeders com produtos pré-cadastrados
- ✅ Validação de dados
- ✅ CORS configurado

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 18
- React Router DOM
- CSS3 com design responsivo
- Axios para requisições HTTP

### Backend
- Node.js
- Express.js
- Sequelize ORM
- SQLite (desenvolvimento)
- PostgreSQL (produção via Docker)
- CORS
- dotenv

## 📦 Estrutura do Projeto

```
Cafeteria/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── models/          # Modelos do banco de dados
│   │   ├── routes/          # Rotas da API
│   │   ├── services/        # Serviços de negócio
│   │   ├── database/        # Configurações e seeders
│   │   └── middlewares/     # Middlewares personalizados
│   ├── index.js             # Servidor principal (PostgreSQL)
│   ├── index-sqlite.js      # Servidor alternativo (SQLite)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços de API
│   │   └── styles/          # Arquivos CSS
│   ├── public/
│   └── package.json
├── docker-compose.yml       # Configuração Docker
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Opção 1: Desenvolvimento Local (SQLite)

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd Cafeteria
```

2. **Instale as dependências do Backend**
```bash
cd Backend
npm install
```

3. **Instale as dependências do Frontend**
```bash
cd ../frontend
npm install
```

4. **Execute o Backend (SQLite)**
```bash
cd ../Backend
node index-sqlite.js
```

5. **Execute o Frontend**
```bash
cd ../frontend
npm start
```

6. **Acesse a aplicação**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Opção 2: Docker (PostgreSQL)

1. **Execute com Docker Compose**
```bash
docker-compose up --build
```

2. **Acesse a aplicação**
- Frontend: http://localhost:8080
- Backend API: http://localhost:3001

## 📋 Endpoints da API

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/:id` - Buscar produto por ID
- `POST /api/products` - Criar novo produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

### Pedidos
- `GET /api/orders` - Listar todos os pedidos
- `GET /api/orders/:id` - Buscar pedido por ID
- `POST /api/orders` - Criar novo pedido
- `PUT /api/orders/:id/status` - Atualizar status do pedido
- `DELETE /api/orders/:id` - Deletar pedido

### Health Check
- `GET /health` - Verificar status da API

## 🎨 Produtos Pré-cadastrados

A aplicação vem com os seguintes produtos:

### ☕ Cafés
- Espresso - R$ 4,50
- Cappuccino - R$ 6,50
- Latte - R$ 7,00
- Americano - R$ 5,00
- Mocha - R$ 8,00
- Macchiato - R$ 5,50

### 🧊 Bebidas Geladas
- Frappé - R$ 7,50

### 🥐 Comidas
- Croissant - R$ 4,00
- Pão de Açúcar - R$ 3,50
- Bolo de Chocolate - R$ 6,00

## 🔧 Configuração

### Variáveis de Ambiente (Backend)

Crie um arquivo `.env` na pasta Backend:

```env
# Desenvolvimento (SQLite)
NODE_ENV=development

# Produção (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cafeteria
DB_USER=postgres
DB_PASS=password

# Servidor
PORT=3001
```

## 🧪 Testando a Aplicação

1. **Acesse** http://localhost:3000
2. **Visualize** os produtos na página inicial
3. **Adicione** produtos ao carrinho
4. **Clique** em "Finalizar Pedido"
5. **Preencha** os dados do cliente
6. **Confirme** o pedido
7. **Veja** a mensagem de sucesso

## 🐛 Solução de Problemas

### Backend não conecta ao banco
- Verifique se o SQLite está funcionando: `node index-sqlite.js`
- Para PostgreSQL: verifique se o Docker está rodando

### Frontend não carrega
- Verifique se o arquivo `src/index.js` existe
- Execute `npm install` na pasta frontend
- Verifique se a porta 3000 está livre

### Erro de CORS
- O backend já está configurado para aceitar requisições do frontend
- Verifique se as URLs estão corretas nos serviços

## 📝 Próximas Melhorias

- [ ] Autenticação de usuários
- [ ] Painel administrativo
- [ ] Sistema de pagamento
- [ ] Notificações em tempo real
- [ ] Histórico de pedidos
- [ ] Avaliações de produtos
- [ ] Sistema de cupons

## 👨‍💻 Desenvolvedor

Desenvolvido por **Gilberto** - Especialista em desenvolvimento Full Stack

---

**Status**: ✅ **APLICAÇÃO FUNCIONAL E OPERACIONAL**

A aplicação está completamente funcional com comunicação entre frontend e backend, banco de dados operacional e interface atrativa.
