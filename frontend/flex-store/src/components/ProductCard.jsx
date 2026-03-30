import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { FavoriteContext } from '../context/FavoriteContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoriteContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    alert('Added to cart!');
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  const isFav = isFavorite(product.id);

  // Helper to ensure correct image URL formatting if it comes from our local upload
  const imageUrl = product.image && product.image.startsWith('/uploads/') 
      ? `http://localhost:5000${product.image}` 
      : product.image;

  return (
    <Link to={`/product/${product.id}`} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full">
      <button 
        onClick={handleToggleFavorite}
        className="absolute z-10 top-3 left-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors border border-gray-100"
      >
        <Heart className={`w-4 h-4 transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
      </button>

      <div className="relative aspect-square overflow-hidden bg-gray-50 p-4 pt-10">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-600 border border-gray-200 shadow-sm">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight flex-grow">{product.name}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">${Number(product.price).toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="p-2 bg-gray-100 text-gray-900 rounded-full hover:bg-indigo-600 hover:text-white transition-colors flex-shrink-0"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
