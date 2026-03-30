import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { FavoriteContext } from '../context/FavoriteContext';
import ProductCard from '../components/ProductCard';

function Favorites() {
  const { favorites } = useContext(FavoriteContext);

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">No Favorites Yet</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't added any products to your wishlist. Go discover some amazing tech!</p>
        <Link to="/products" className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-indigo-700 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
