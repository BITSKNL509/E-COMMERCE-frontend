import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  // For demo, not using auth context yet
  const isAdmin = false;
  return (
    <nav className="navbar">
      <div className="navbar-logo"><Link to="/">MiniShop</Link></div>
      <ul className="navbar-links">
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        {isAdmin && <li><Link to="/admin">Admin</Link></li>}
        <li><Link to="/login">Login</Link> / <Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar; 