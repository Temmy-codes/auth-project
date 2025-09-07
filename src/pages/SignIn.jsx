import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/signin', form); // { token, user }
      const token = res.data.token || res.data.accessToken;
      const user = res.data.user || res.data;
      if (!token) throw { message: 'No token in response' };
      login(token, user);
      toast.success('Signed in');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.message || err?.data?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="title">Sign In</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>Email</span>
          <input name="email" value={form.email} onChange={handleChange} type="email" required />
        </label>

        <label>
          <span>Password</span>
          <input name="password" value={form.password} onChange={handleChange} type="password" required />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? <><LoadingSpinner size={18} /> Signing in...</> : 'Sign In'}
        </button>
      </form>

      <div className="row">
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/signup">Create account</Link>
      </div>
    </div>
  );
}
