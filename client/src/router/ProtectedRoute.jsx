import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  return token ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
