const express = require('express');
const ProductController = require('../controllers/ProductController');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

// Rotas de produtos
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.destroy);

// Rotas de pedidos
router.get('/orders', OrderController.index);
router.get('/orders/:id', OrderController.show);
router.post('/orders', OrderController.store);
router.patch('/orders/:id/status', OrderController.updateStatus);
router.delete('/orders/:id', OrderController.destroy);

module.exports = router;
