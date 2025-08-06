import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import productService from '../services/productService';
import orderService from '../services/orderService';
import '../styles/HomePage.css';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Erro ao carregar produtos');
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    setShowOrderForm(true);
  };

  const handleSubmitOrder = async (orderData) => {
    try {
      const response = await orderService.create(orderData);
      
      if (response.success) {
        setOrderSuccess(response.data);
        setCartItems([]);
        setShowOrderForm(false);
        
        // Mostrar mensagem de sucesso por alguns segundos
        setTimeout(() => {
          setOrderSuccess(null);
        }, 5000);
      } else {
        alert('Erro ao criar pedido: ' + response.message);
      }
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Erro ao enviar pedido. Tente novamente.');
    }
  };

  const handleCancelOrder = () => {
    setShowOrderForm(false);
  };

  if (loading) {
    return (
      <div className="homepage">
        <div className="loading">
          <h2>Carregando produtos...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage">
        <div className="error">
          <h2>Erro</h2>
          <p>{error}</p>
          <button onClick={loadProducts} className="retry-btn">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <header className="header">
        <h1>☕ Cafeteria</h1>
        <p>Monte seu café perfeito!</p>
      </header>

      {orderSuccess && (
        <div className="success-message">
          <h3>✅ Pedido realizado com sucesso!</h3>
          <p>Pedido #{orderSuccess.id} - {orderSuccess.customerName}</p>
          <p>Total: R$ {orderSuccess.totalAmount}</p>
        </div>
      )}

      {showOrderForm ? (
        <OrderForm
          cartItems={cartItems}
          onSubmitOrder={handleSubmitOrder}
          onCancel={handleCancelOrder}
        />
      ) : (
        <div className="main-content">
          <div className="products-section">
            <h2>Nossos Produtos</h2>
            
            {products.length === 0 ? (
              <p>Nenhum produto disponível no momento.</p>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="cart-section">
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
}
