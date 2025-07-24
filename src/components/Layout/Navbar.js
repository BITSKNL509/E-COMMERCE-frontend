import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setRole(user?.role);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/cart" className="navbar-cart-icon" title="Cart">
          <span role="img" aria-label="cart" style={{fontSize: '1.8em', marginRight: '0.3em'}}>🛒</span>
        </Link>
        <Link to="/" className="navbar-logo">  Ease-Shop</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to={role === 'admin' ? "/admin/dashboard" : "/"}>Home</Link></li>
        <li><Link to="/products">Shop</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit" className="navbar-search-icon" title="Search">
          <span role="img" aria-label="search">🔍</span>
        </button>
      </form>
      <div className="navbar-right">
        <Link to="/login" className="navbar-user-icon" title="Login">
          <span role="img" aria-label="user">👤</span>
        </Link>
        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 