const express = require('express');
const ProductController = require('../controllers/ProductController-test');

const router = express.Router();

// Rotas de produtos
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.destroy);

module.exports = router;
