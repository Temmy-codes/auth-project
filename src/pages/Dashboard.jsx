import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="card">
      <h2 className="title">Dashboard</h2>
      <p>Welcome{user?.username ? `, ${user.username}` : user?.email ? `, ${user.email}` : ''}!</p>
      <div className="row">
        <button className="btn" onClick={() => navigate('/forgot-password')}>Reset password</button>
        <button className="btn ghost" onClick={doLogout}>Log out</button>
      </div>
    </div>
  );
}
