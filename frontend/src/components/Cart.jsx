import React from 'react';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      onRemoveItem(productId);
    } else {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart empty-cart">
        <h3>Seu Carrinho</h3>
        <p>Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h3>Seu Carrinho ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</h3>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <img 
                src={item.image || '/placeholder-coffee.jpg'} 
                alt={item.name}
                className="cart-item-image"
                onError={(e) => {
                  e.target.src = '/placeholder-coffee.jpg';
                }}
              />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p className="cart-item-price">{formatPrice(item.price)}</p>
              </div>
            </div>
            
            <div className="cart-item-controls">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <div className="cart-item-subtotal">
                {formatPrice(item.price * item.quantity)}
              </div>
              
              <button 
                className="remove-btn"
                onClick={() => onRemoveItem(item.id)}
                title="Remover item"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-footer">
        <div className="cart-total">
          <strong>Total: {formatPrice(calculateTotal())}</strong>
        </div>
        <button 
          className="checkout-btn"
          onClick={onCheckout}
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default Cart;
