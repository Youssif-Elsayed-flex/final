import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setFeaturedProducts(response.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured products', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              The Next Generation of Mobile Tech
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Discover the latest smartphones, premium audio, and smart accessories all in one place.
            </p>
            <Link 
              to="/products"
              className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
            >
              Shop Now
            </Link>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-72 h-72 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=400" className="w-56 h-auto rounded-xl shadow-2xl transform rotate-12" alt="Hero Phone" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2">Our most popular mobile devices right now.</p>
          </div>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-800 font-medium">View All &rarr;</Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categories preview */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Smartphone', 'Earphones', 'Smart Watch', 'Accessories'].map(cat => (
               <Link 
                 to={`/products?category=${cat}`} 
                 key={cat}
                 className="bg-white p-6 rounded-xl shadow-sm text-center font-bold text-gray-800 hover:shadow-md hover:text-indigo-600 transition-all"
               >
                 {cat}
               </Link>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
