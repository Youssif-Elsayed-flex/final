import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, Edit, Trash2, LogOut } from 'lucide-react';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProducts();
  }, [navigate, token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link to="/admin/products/add" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            <PlusCircle className="w-5 h-5" /> Add New Product
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
              <th className="p-4 font-semibold">Product</th>
              <th className="p-4 font-semibold hidden md:table-cell">Category</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold hidden sm:table-cell">Stock</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-4 flex items-center gap-4">
                  <img 
                    src={product.image && product.image.startsWith('/uploads/') ? `http://localhost:5000${product.image}` : product.image} 
                    alt={product.name} 
                    className="w-12 h-12 object-contain bg-white border border-gray-200 rounded" 
                  />
                  <div>
                    <div className="font-bold text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.brand}</div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-gray-600">{product.category}</td>
                <td className="p-4 font-bold text-gray-900">${Number(product.price).toFixed(2)}</td>
                <td className="p-4 hidden sm:table-cell text-gray-600">{product.stock}</td>
                <td className="p-4 flex justify-end gap-2">
                  <Link to={`/admin/products/edit/${product.id}`} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition">
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <div className="p-8 text-center text-gray-500">No products found. Add some!</div>}
      </div>
    </div>
  );
}

export default AdminDashboard;
