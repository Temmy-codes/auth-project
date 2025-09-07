import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    let cancelled = false;

    const fetchMe = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        if (!cancelled) {
          setUser(res.data.user || res.data);
        }
      } catch (err) {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
      } finally {
        if (!cancelled) setAuthLoading(false);
      }
    };

    fetchMe();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = (tokenValue, userData) => {
    setToken(tokenValue);
    localStorage.setItem('authToken', tokenValue);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
