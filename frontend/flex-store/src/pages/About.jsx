import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-800">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-600">About Flex Store</h1>
      <p className="text-lg leading-relaxed mb-6 text-gray-600">
        Flex Store is your premier destination for high-quality mobile technology. We believe in providing our customers with the latest innovations in smartphones, audio, and accessories with a smooth, hassle-free shopping experience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
          <p className="text-gray-500 text-sm">We only stock products from top-tier, trusted global brands ensuring you get the best tech possible.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-3">Fast Shipping</h3>
          <p className="text-gray-500 text-sm">Enjoy fast and reliable shipping across the country directly to your doorstep.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-3">Customer Support</h3>
          <p className="text-gray-500 text-sm">Our friendly support team is ready to help you with any questions or technical issues.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
