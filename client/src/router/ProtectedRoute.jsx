import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const { user: userObj } = user;

  return userObj ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
