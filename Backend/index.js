require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const { syncDatabase } = require('./src/models');

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:8080',
    /^https:\/\/.*\.onrender\.com$/,
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  next();
});

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  console.log('Health check accessed');
  res.json({ status: 'OK', message: 'Cafeteria API is running!' });
});

const PORT = process.env.PORT || 3001;

// Inicializar banco de dados e servidor
const startServer = async () => {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao inicializar servidor:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
