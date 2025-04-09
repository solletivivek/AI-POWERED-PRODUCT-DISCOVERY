import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-md rounded-lg w-96">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
