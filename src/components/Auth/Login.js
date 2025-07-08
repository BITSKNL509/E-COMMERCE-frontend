import React, { useState } from 'react';
import { fetchAPI } from '../../api';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const res = await fetchAPI('/auth/login', 'POST', form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      window.location = '/';
    } else {
      setError(res.msg || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" className="btn-main">Login</button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </div>
  );
};

export default Login; 