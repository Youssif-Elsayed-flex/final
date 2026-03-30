import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="flex justify-center mb-6">
          <ShoppingBag className="w-24 h-24 text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any products to your cart yet. Discover our top tech devices.</p>
        <Link to="/products" className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-gray-800">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center p-6 border-b border-gray-100 last:border-b-0 gap-6">
                <img src={item.image && item.image.startsWith('/uploads/') ? 'http://localhost:5000' + item.image : item.image} alt={item.name} className="w-24 h-24 object-contain bg-gray-50 rounded-lg p-2" />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                  <p className="text-indigo-600 font-bold">${Number(item.price).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button 
                      className="px-3 py-1 bg-gray-50 hover:bg-gray-200"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button 
                      className="px-3 py-1 bg-gray-50 hover:bg-gray-200"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24 text-gray-800">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-xl text-indigo-600">${getCartTotal().toFixed(2)}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
