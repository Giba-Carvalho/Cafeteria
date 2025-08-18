const Product = require('../../models/Product');

const seedProducts = async () => {
  try {
    const products = [
      {
        name: 'Espresso',
        description: 'Café espresso tradicional, forte e encorpado',
        price: 4.50,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        name: 'Cappuccino',
        description: 'Espresso com leite vaporizado e espuma cremosa',
        price: 6.50,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        name: 'Latte',
        description: 'Espresso com muito leite vaporizado e pouca espuma',
        price: 7.00,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        name: 'Americano',
        description: 'Espresso diluído em água quente',
        price: 5.00,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        name: 'Mocha',
        description: 'Espresso com chocolate, leite vaporizado e chantilly',
        price: 8.00,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        name: 'Macchiato',
        description: 'Espresso com uma pequena quantidade de leite vaporizado',
        price: 5.50,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        name: 'Frappé',
        description: 'Café gelado batido com gelo e açúcar',
        price: 7.50,
        category: 'cold',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        name: 'Croissant',
        description: 'Croissant francês tradicional, crocante e amanteigado',
        price: 4.00,
        category: 'food',
        image: 'https://images.unsplash.com/photo-1555507036-ab794f4afe5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        name: 'Pão de Açúcar',
        description: 'Pão doce tradicional brasileiro',
        price: 3.50,
        category: 'food',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        available: true
      },
      {
        name: 'Bolo de Chocolate',
        description: 'Fatia de bolo de chocolate com cobertura',
        price: 6.00,
        category: 'food',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        available: true
      }
    ];

    // Verificar se já existem produtos
    const existingProducts = await Product.count();
    
    if (existingProducts === 0) {
      await Product.bulkCreate(products);
      console.log('Produtos iniciais criados com sucesso!');
    } else {
      console.log('Produtos já existem no banco de dados.');
    }
  } catch (error) {
    console.error('Erro ao criar produtos iniciais:', error);
  }
};

module.exports = seedProducts;
