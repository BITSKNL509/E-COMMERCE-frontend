import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchAPI } from '../../api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchAPI('/products').then(setProducts).finally(() => setLoading(false));
  }, []);

  const params = new URLSearchParams(location.search);
  const search = params.get('search')?.toLowerCase() || '';
  const category = params.get('category')?.toLowerCase() || '';

  let filtered = products;
  if (category) {
    filtered = filtered.filter(product =>
      product.category && product.category.toLowerCase() === category
    );
  }
  if (search) {
    filtered = filtered.filter(product =>
      (product.name && product.name.toLowerCase().includes(search)) ||
      (product.title && product.title.toLowerCase().includes(search))
    );
  }

  // Sort products by _id
  const sorted = [...filtered].sort((a, b) => (a._id > b._id ? 1 : -1));

  return (
    <div className="products-list">
      <h2>Products</h2>
      <div className="products-grid">
        {loading ? (
          <div>Loading products...</div>
        ) : sorted.length === 0 ? (
          <div>No products found.</div>
        ) : (
          sorted.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name || product.title} />
              <p>{product.name || product.title}</p>
              <p>${product.price}</p>
              <Link to={`/products/${product._id}`} className="btn-main">View</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products; 