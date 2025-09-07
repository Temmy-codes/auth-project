import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {darkMode ? ' Light' : ' Dark'}
    </button>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="app-shell">
            <ThemeToggle />
            <main className="container">
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/signin" replace />} />
                <Route path="*" element={<Navigate to="/signin" replace />} />
              </Routes>
            </main>
            <ToastContainer position="top-right" />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
