import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Flex Store</h3>
          <p className="text-sm">
            Your one-stop destination for the latest smartphones, accessories, and tech gadgets. Clean, reliable, and premium quality for all your mobile needs.
          </p>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link to="/products" className="hover:text-indigo-400">Products</Link></li>
            <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@nexamobile.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Tech Avenue, City</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Flex Store. All rights reserved. Built for education.
      </div>
    </footer>
  );
}

export default Footer;
