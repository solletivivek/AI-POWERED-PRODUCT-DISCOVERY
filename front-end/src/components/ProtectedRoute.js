import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the token exists
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }
  return children; // Render the protected component if the token exists
};

export default ProtectedRoute;