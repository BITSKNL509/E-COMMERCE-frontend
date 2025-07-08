import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div className="home">
    <h1>Welcome to MiniShop!</h1>
    <p>Your one-stop shop for awesome products.</p>
    <Link to="/products" className="btn-main">Shop Now</Link>
  </div>
);

export default Home; 