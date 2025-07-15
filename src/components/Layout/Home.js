import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div className="home">
    <div className="hero-section">
      <div className="hero-left">
        <h1 className="hero-title">New<br />Arrivals</h1>
        <p className="hero-desc">HURRY UP! LIMITED TIME OFFER.</p>
        <Link to="/products" className="btn-main hero-btn">Shop Now</Link>
      </div>
      <div className="hero-right">
        <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" alt="Bag" className="hero-img hero-img1" />
        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Shoes" className="hero-img hero-img2" />
        <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" alt="Sweater" className="hero-img hero-img3" />
      </div>
    </div>
    <div className="featured-section">
      <h2 className="featured-title">Featured Products</h2>
      <div className="featured-products">
        <Link to="/products" className="featured-card">
          <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80" alt="T-shirt" />
          <div>T-shirt</div>
        </Link>
        <Link to="/products" className="featured-card">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80" alt="Bag" />
          <div>Bag</div>
        </Link>
        <Link to="/products" className="featured-card">
          <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=200&q=80" alt="Perfume" />
          <div>Perfume</div>
        </Link>
        <Link to="/products" className="featured-card">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" alt="Shoes" />
          <div>Shoes</div>
        </Link>
      </div>
    </div>
  </div>
);

export default Home; 