import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token, authLoading } = useAuth();

  if (authLoading) return <div className="center"><p>Checking authentication...</p></div>;
  if (!token) return <Navigate to="/signin" replace />;
  return children;
}
