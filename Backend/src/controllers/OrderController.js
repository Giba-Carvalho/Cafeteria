const { Order, OrderItem, Product } = require('../models/index');

class OrderController {
  // Listar todos os pedidos
  async index(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            as: 'items',
            include: [
              {
                model: Product,
                as: 'product'
              }
            ]
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // Buscar pedido por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: [
          {
            model: OrderItem,
            as: 'items',
            include: [
              {
                model: Product,
                as: 'product'
              }
            ]
          }
        ]
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Pedido não encontrado'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // Criar novo pedido
  async store(req, res) {
    try {
      const { customerName, customerEmail, customerPhone, items, notes } = req.body;

      if (!customerName || !items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Nome do cliente e itens são obrigatórios'
        });
      }

      // Calcular total do pedido
      let totalAmount = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        
        if (!product) {
          return res.status(400).json({
            success: false,
            message: `Produto com ID ${item.productId} não encontrado`
          });
        }

        if (!product.available) {
          return res.status(400).json({
            success: false,
            message: `Produto ${product.name} não está disponível`
          });
        }

        const subtotal = parseFloat(product.price) * item.quantity;
        totalAmount += subtotal;

        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
          subtotal: subtotal,
          customizations: item.customizations || null
        });
      }

      // Criar pedido
      const order = await Order.create({
        customerName,
        customerEmail,
        customerPhone,
        totalAmount,
        notes
      });

      // Criar itens do pedido
      for (const item of orderItems) {
        await OrderItem.create({
          orderId: order.id,
          ...item
        });
      }

      // Buscar pedido completo para retornar
      const completeOrder = await Order.findByPk(order.id, {
        include: [
          {
            model: OrderItem,
            as: 'items',
            include: [
              {
                model: Product,
                as: 'product'
              }
            ]
          }
        ]
      });

      res.status(201).json({
        success: true,
        data: completeOrder,
        message: 'Pedido criado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // Atualizar status do pedido
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['pending', 'preparing', 'ready', 'delivered', 'cancelled'];
      
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status inválido. Use: pending, preparing, ready, delivered, cancelled'
        });
      }

      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Pedido não encontrado'
        });
      }

      await order.update({ status });

      res.json({
        success: true,
        data: order,
        message: 'Status do pedido atualizado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // Deletar pedido
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Pedido não encontrado'
        });
      }

      // Deletar itens do pedido primeiro
      await OrderItem.destroy({ where: { orderId: id } });
      
      // Deletar pedido
      await order.destroy();

      res.json({
        success: true,
        message: 'Pedido deletado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }
}

module.exports = new OrderController();
