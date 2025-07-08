import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from '../../api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchAPI(`/products/${id}`).then(setProduct);
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exists = cart.find(item => item.product._id === product._id);
    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setMsg('Added to cart!');
  };

  if (!product) return <div>Loading...</div>;
  return (
    <div className="product-detail">
      <img src={product.image || 'https://via.placeholder.com/250'} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Category: {product.category?.name}</p>
        <p>Price: ${product.price}</p>
        <button className="btn-main" onClick={addToCart}>Add to Cart</button>
        {msg && <div className="cart-msg">{msg}</div>}
      </div>
    </div>
  );
};

export default ProductDetail; 