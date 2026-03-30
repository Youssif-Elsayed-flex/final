import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('adminToken');
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Smartphone',
    price: '',
    description: '',
    stock: '10'
  });
  const [existingImage, setExistingImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const p = response.data;
        setFormData({
          name: p.name,
          brand: p.brand,
          category: p.category,
          price: p.price,
          description: p.description,
          stock: p.stock
        });
        setExistingImage(p.image);
        setFetching(false);
      } catch (error) {
        console.error('Error fetching product', error);
        navigate('/admin/dashboard');
      }
    };
    fetchProduct();
  }, [id, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    // Only append image if a new one is selected
    if (imageFile) {
      data.append('image', imageFile);
    } else {
        // Pass back existing image string
        data.append('image', existingImage);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/admin/dashboard');
    } catch (error) {
      alert('Failed to update product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-24">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/admin/dashboard" className="flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition-colors w-fit">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
      </Link>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
        
        <div className="w-full md:w-1/3">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Current Image</h3>
          <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center p-4 border border-gray-200">
            <img 
               src={existingImage && existingImage.startsWith('/uploads/') ? `http://localhost:5000${existingImage}` : existingImage} 
               alt="Current product" 
               className="max-h-full object-contain"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Upload a new file to replace this image.</p>
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input required type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white">
                  <option>Smartphone</option>
                  <option>Earphones</option>
                  <option>Smart Watch</option>
                  <option>Charger</option>
                  <option>Case</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Image (Optional)</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-50 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>
            <button type="submit" disabled={loading} className="flex items-center justify-center w-full md:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow">
              <Save className="w-5 h-5 mr-2" /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
