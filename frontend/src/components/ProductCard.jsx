import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image || '/placeholder-coffee.jpg'} 
          alt={product.name}
          onError={(e) => {
            e.target.src = '/placeholder-coffee.jpg';
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.available}
          >
            {product.available ? 'Adicionar' : 'Indisponível'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
