const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco SQLite estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
};

testConnection();

module.exports = sequelize;
