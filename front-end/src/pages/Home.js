import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Product Discovery Tool
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Discover amazing products, compare prices, and make informed decisions with ease.
        </p>
        <Link to="/products" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Explore Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
