import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../../api';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); //  navigate("/admin/dashboard") 
    }
  }, [navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const res = await fetchAPI('https://e-commerce-backend-es24.onrender.com/auth/login', 'POST', form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      if (res.user && res.user.role === "admin") {
        window.location = "/admin/dashboard";
      } else {
        window.location = "/";
      }
    } else {
      setError(res.msg || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <label>Password</label>
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="btn-main">Login</button>
          {error && <div className="auth-error">{error}</div>}
        </form>
        <div className="auth-bottom-text">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 