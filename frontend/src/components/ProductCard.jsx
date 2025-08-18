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
          src={product.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjOEI0NTEzIi8+PHJlY3QgeD0iMTIwIiB5PSI3MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iI0QyNjkxRSIvPjxjaXJjbGUgY3g9IjE0MCIgY3k9Ijg1IiByPSIzIiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjciLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSI4NSIgcj0iMyIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC43Ii8+PHBhdGggZD0iTTEzMCAxMTAgUTE1MCAxMjAgMTcwIDExMCIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuNyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPkltYWdlbSBkbyBQcm9kdXRvPC90ZXh0Pjwvc3ZnPg=='} 
          alt={product.name}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjOEI0NTEzIi8+PHJlY3QgeD0iMTIwIiB5PSI3MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iI0QyNjkxRSIvPjxjaXJjbGUgY3g9IjE0MCIgY3k9Ijg1IiByPSIzIiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjciLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSI4NSIgcj0iMyIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC43Ii8+PHBhdGggZD0iTTEzMCAxMTAgUTE1MCAxMjAgMTcwIDExMCIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuNyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPkltYWdlbSBkbyBQcm9kdXRvPC90ZXh0Pjwvc3ZnPg==';
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
