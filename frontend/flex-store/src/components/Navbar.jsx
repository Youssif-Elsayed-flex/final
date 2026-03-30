import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Smartphone, Menu } from 'lucide-react';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { getCartCount } = useContext(CartContext);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-indigo-600">
              <Smartphone className="w-8 h-8" />
              <span className="font-bold text-xl text-gray-900">Flex Store</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-indigo-600 font-medium">Products</Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium">About Us</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/favorites" className="relative p-2 text-gray-600 hover:text-indigo-600">
              <Heart className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600">
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button className="md:hidden text-gray-600 p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
