import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import { isValidEmail, isStrongPassword } from '../utils/validators';
import LoadingSpinner from '../components/LoadingSpinner';

export default function SignUp() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(form.email)) return toast.error('Invalid email format');
    if (!isStrongPassword(form.password)) return toast.error('Password not strong enough (min 8, 1 letter, 1 number)');
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');

    setLoading(true);
    try {
      await api.post('/auth/signup', {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      toast.success('Sign up successful — verification email sent (check inbox)');
      // keep user on page — they must verify email first
      setForm({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err?.message || err?.data?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="title">Create account</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>Username</span>
          <input name="username" value={form.username} onChange={handleChange} required />
        </label>

        <label>
          <span>Email</span>
          <input name="email" value={form.email} onChange={handleChange} type="email" required />
        </label>

        <label>
          <span>Password</span>
          <input name="password" value={form.password} onChange={handleChange} type="password" required />
        </label>

        <label>
          <span>Confirm Password</span>
          <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" required />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? <><LoadingSpinner size={18} /> Signing up...</> : 'Sign Up'}
        </button>
      </form>

      <div className="row">
        <Link to="/signin">Already have an account? Sign in</Link>
      </div>
    </div>
  );
}
