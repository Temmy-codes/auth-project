import React, { useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('If that email exists, a reset link was sent.');
      setEmail('');
    } catch (err) {
      toast.error(err?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="title">Forgot password</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? <><LoadingSpinner size={18} /> Sending...</> : 'Send reset link'}
        </button>
      </form>
    </div>
  );
}
