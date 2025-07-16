import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../../api';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', adminCode: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const body = { ...form };
    if (!body.adminCode) delete body.adminCode;
    const res = await fetchAPI('/auth/register', 'POST', body);
    if (res.token) {
      setSuccess('Registration successful! Please login to continue.');
      setForm({ name: '', email: '', password: '', adminCode: '' });
      setTimeout(() => {
        window.location = '/login';
      }, 2000);
    } else {
      setError(res.msg || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">E-Shop</h2>
        <div className="auth-subtitle">Create your account to start shopping</div>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Name</label>
          <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
          <label>Email</label>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <label>Password</label>
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <label>Admin Code <span style={{fontWeight: 400, color: "#888"}}>(optional)</span></label>
          <input name="adminCode" type="text" placeholder="Admin Code (optional)" value={form.adminCode} onChange={handleChange} />
          <button type="submit" className="btn-main">Register</button>
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}
        </form>
        <div className="auth-bottom-text">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 