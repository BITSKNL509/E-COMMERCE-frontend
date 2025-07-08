import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../../api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchAPI('/products').then(setProducts);
  }, []);
  return (
    <div className="products-list">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map(p => (
          <div className="product-card" key={p._id}>
            <img src={p.image || 'https://via.placeholder.com/150'} alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <Link to={`/products/${p._id}`} className="btn-main">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products; 