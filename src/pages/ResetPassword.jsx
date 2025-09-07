import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      toast.success('Password reset. You can now sign in.');
    } catch (err) {
      toast.error(err?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <div className="card"><h3>No token provided</h3><p>Use the link from your email.</p><Link to="/forgot-password">Request link</Link></div>;

  return (
    <div className="card">
      <h2 className="title">Reset password</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>New password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          <span>Confirm password</span>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </label>
        <button className="btn" disabled={loading} type="submit">
          {loading ? <><LoadingSpinner size={18} /> Resetting...</> : 'Reset password'}
        </button>
      </form>
    </div>
  );
}
