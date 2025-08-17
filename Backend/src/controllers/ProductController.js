const { Product } = require('../models/index');

class ProductController {
  // Listar todos os produtos
  async index(req, res) {
    try {
      const products = await Product.findAll({
        where: { available: true },
        order: [['name', 'ASC']]
      });
      
      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // Buscar produto por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        });
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // Criar novo produto
  async store(req, res) {
    try {
      const { name, description, price, category, image } = req.body;

      if (!name || !price) {
        return res.status(400).json({
          success: false,
          message: 'Nome e preço são obrigatórios'
        });
      }

      const product = await Product.create({
        name,
        description,
        price,
        category,
        image
      });

      res.status(201).json({
        success: true,
        data: product,
        message: 'Produto criado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // Atualizar produto
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, category, image, available } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        });
      }

      await product.update({
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        category: category || product.category,
        image: image || product.image,
        available: available !== undefined ? available : product.available
      });

      res.json({
        success: true,
        data: product,
        message: 'Produto atualizado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // Deletar produto
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        });
      }

      await product.destroy();

      res.json({
        success: true,
        message: 'Produto deletado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }
}

module.exports = new ProductController();
