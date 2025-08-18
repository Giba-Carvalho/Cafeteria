import api from './api';

// Dados mock para quando o backend não estiver disponível
const mockProducts = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Café espresso tradicional, forte e encorpado',
    price: 4.50,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    available: true
  },
  {
    id: 2,
    name: 'Cappuccino',
    description: 'Espresso com leite vaporizado e espuma cremosa',
    price: 6.50,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    available: true
  },
  {
    id: 3,
    name: 'Latte',
    description: 'Espresso com muito leite vaporizado e pouca espuma',
    price: 7.00,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    available: true
  },
  {
    id: 4,
    name: 'Americano',
    description: 'Espresso diluído em água quente',
    price: 5.00,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    available: true
  },
  {
    id: 5,
    name: 'Mocha',
    description: 'Espresso com chocolate, leite vaporizado e chantilly',
    price: 8.00,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    available: true
  },
  {
    id: 6,
    name: 'Macchiato',
    description: 'Espresso com uma pequena quantidade de leite vaporizado',
    price: 5.50,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    available: true
  },
  {
    id: 7,
    name: 'Frappé',
    description: 'Café gelado batido com gelo e açúcar',
    price: 7.50,
    category: 'cold',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    available: true
  },
  {
    id: 8,
    name: 'Croissant',
    description: 'Croissant francês tradicional, crocante e amanteigado',
    price: 4.00,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    available: true
  },
  {
    id: 9,
    name: 'Pão de Açúcar',
    description: 'Pão doce tradicional brasileiro',
    price: 3.50,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    available: true
  },
  {
    id: 10,
    name: 'Bolo de Chocolate',
    description: 'Fatia de bolo de chocolate com cobertura',
    price: 6.00,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    available: true
  }
];

export const productService = {
  // Buscar todos os produtos
  async getAll() {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      console.log('Usando dados mock devido ao erro no backend');
      // Retorna dados mock quando o backend falha
      return mockProducts;
    }
  },

  // Buscar produto por ID
  async getById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  },

  // Criar novo produto
  async create(productData) {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },

  // Atualizar produto
  async update(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  },

  // Deletar produto
  async delete(id) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  }
};

export default productService;
