const sequelize = require('../database/connection');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const seedProducts = require('../database/seeders/products');

// Define associations
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'items'
});

OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order'
});

Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  as: 'orderItems'
});

OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
});

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Tabelas sincronizadas com sucesso.');
    
    // Executar seeders
    await seedProducts();
  } catch (error) {
    console.error('Erro ao sincronizar tabelas:', error);
    throw error; // Re-throw para que o servidor saiba que houve erro
  }
};

module.exports = {
  sequelize,
  Product,
  Order,
  OrderItem,
  syncDatabase
};
