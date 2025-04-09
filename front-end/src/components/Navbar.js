import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/products" className="hover:text-gray-400">Products</Link>
        <Link to="/login" className="hover:text-gray-400">Login</Link>
        <Link to="/register" className="hover:text-gray-400">Register</Link>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          placeholder="Search products"
          className="p-2 rounded text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
