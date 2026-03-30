import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-bold text-gray-800">Product not found</h2>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/products" className="flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Products
      </Link>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
          <img src={product.image && product.image.startsWith('/uploads/') ? 'http://localhost:5000' + product.image : product.image} alt={product.name} className="max-h-[500px] object-contain drop-shadow-xl" />
        </div>
        
        {/* Product Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-2 text-indigo-600 font-semibold tracking-wide uppercase text-sm">
            {product.brand} &bull; {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {product.name}
          </h1>
          <div className="text-3xl font-bold text-gray-900 mb-6 font-mono">
            ${Number(product.price).toFixed(2)}
          </div>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center gap-2 mb-8 text-green-600 font-medium bg-green-50 px-4 py-2 rounded-lg w-fit">
            <CheckCircle className="w-5 h-5" /> In Stock ({product.stock} available)
          </div>

          <div className="flex items-center gap-6 mb-8 pt-6 border-t border-gray-100">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-12">
              <button 
                className="px-4 bg-gray-50 hover:bg-gray-200 h-full text-gray-600 transition-colors font-bold"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >-</button>
              <div className="w-16 flex items-center justify-center font-bold text-gray-800">{quantity}</div>
              <button 
                className="px-4 bg-gray-50 hover:bg-gray-200 h-full text-gray-600 transition-colors font-bold"
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
              >+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-lg transition-colors shadow-lg shadow-indigo-200"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
