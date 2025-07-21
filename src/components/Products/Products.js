import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchAPI } from '../../api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI('/products').then(setProducts).finally(() => setLoading(false));
  }, []);

  const params = new URLSearchParams(location.search);
  const search = params.get('search')?.toLowerCase() || '';
  const filtered = search
    ? products.filter(product =>
        (product.name && product.name.toLowerCase().includes(search)) ||
        (product.title && product.title.toLowerCase().includes(search))
      )
    : products;

  // Sort products by _id
  const sorted = [...filtered].sort((a, b) => (a._id > b._id ? 1 : -1));

  return (
    <div className="products-list">
      <h2>Products</h2>
      <div className="products-grid">
        {loading && <div>Loading products...</div>}
        {!loading && sorted.length === 0 && <div>No products found.</div>}
        {!loading && sorted.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name || product.title} />
            <p>{product.name || product.title}</p>
            <p>${product.price}</p>
            <Link to={`/products/${product._id}`} className="btn-main">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products; 