import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      return;
    }

    (async () => {
      try {
        await api.post('/auth/verify-email', { token });
        toast.success('Email verified');
        setStatus('success');
      } catch (err) {
        toast.error(err?.message || 'Verification failed');
        setStatus('error');
      }
    })();
  }, [searchParams]);

  if (status === 'loading') return <div className="center"><LoadingSpinner /> Verifying...</div>;
  if (status === 'error') return <div className="card"><h3>Verification Failed</h3><p>Try signing up again or request a new link.</p><Link to="/signup">Sign up</Link></div>;
  return <div className="card"><h3>Email Verified</h3><p>Your account is verified — you can now <Link to="/signin">sign in</Link>.</p></div>;
}
