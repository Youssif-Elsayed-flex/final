import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-indigo-600">Contact Us</h1>
      <p className="text-center text-gray-500 mb-12">We'd love to hear from you. Get in touch with our team.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start">
            <Mail className="w-6 h-6 text-indigo-600 mr-4 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Email</h3>
              <p className="text-gray-500">support@flexstore.com</p>
            </div>
          </div>
          <div className="flex items-start">
            <Phone className="w-6 h-6 text-indigo-600 mr-4 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Phone</h3>
              <p className="text-gray-500">+1 (234) 567-890</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="w-6 h-6 text-indigo-600 mr-4 mt-1" />
            <div>
              <h3 className="font-bold text-lg">Location</h3>
              <p className="text-gray-500">123 Tech Avenue,<br/>Silicon Valley, CA 94000</p>
            </div>
          </div>
        </div>

        <form className="bg-white p-8 rounded-xl shadow-sm border border-gray-100" onSubmit={e => { e.preventDefault(); alert('Message sent!'); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea rows="4" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"></textarea>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
