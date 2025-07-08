import React, { useState } from 'react';
import { fetchAPI } from '../../api';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [msg, setMsg] = useState('');

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const changeQty = (idx, delta) => {
    const newCart = [...cart];
    newCart[idx].quantity += delta;
    if (newCart[idx].quantity < 1) newCart[idx].quantity = 1;
    updateCart(newCart);
  };

  const removeItem = (idx) => {
    const newCart = cart.filter((_, i) => i !== idx);
    updateCart(newCart);
  };

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setMsg('Login to place order');
    const products = cart.map(item => ({ product: item.product._id, quantity: item.quantity }));
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const res = await fetchAPI('/orders', 'POST', { products, total }, token);
    if (res._id) {
      updateCart([]);
      setMsg('Order placed!');
    } else {
      setMsg(res.msg || 'Order failed');
    }
  };

  if (!cart.length) return <div className="cart-empty">Your cart is empty.</div>;
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {cart.map((item, idx) => (
          <li key={item.product._id} className="cart-item">
            <img src={item.product.image || 'https://via.placeholder.com/80'} alt={item.product.name} />
            <div className="cart-info">
              <h4>{item.product.name}</h4>
              <p>${item.product.price} x {item.quantity}</p>
              <div className="cart-actions">
                <button onClick={() => changeQty(idx, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQty(idx, 1)}>+</button>
                <button onClick={() => removeItem(idx)} className="remove-btn">Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">Total: ${cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}</div>
      <button className="btn-main" onClick={placeOrder}>Place Order</button>
      {msg && <div className="cart-msg">{msg}</div>}
    </div>
  );
};

export default Cart; 