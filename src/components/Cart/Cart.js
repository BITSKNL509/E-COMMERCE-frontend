import React, { useState } from 'react';
import { fetchAPI } from '../../api';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [msg, setMsg] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState([]);

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

  const handlePlaceOrderClick = () => {
    if (selectedIndices.length === 0) {
      setMsg('Please select at least one product to order.');
      return;
    }
    setShowPaymentOptions(true);
    setMsg('');
  };

  const handleConfirmPayment = async () => {
    setIsPlacingOrder(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setMsg('Login to place order');
      setIsPlacingOrder(false);
      return;
    }
    const selectedItems = cart.filter((_, i) => selectedIndices.includes(i));
    const products = selectedItems.map(item => ({ product: item.product._id, quantity: item.quantity }));
    const total = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const res = await fetchAPI('/orders', 'POST', { products, total, paymentMethod: selectedPayment }, token);
    if (res._id) {
      // Remove only the ordered items from cart
      const newCart = cart.filter((_, i) => !selectedIndices.includes(i));
      updateCart(newCart);
      setMsg('Order placed!');
      setShowPaymentOptions(false);
      setSelectedPayment('');
      setSelectedIndices([]);
    } else {
      setMsg(res.msg || 'Order failed');
    }
    setIsPlacingOrder(false);
  };

  const selectedTotal = selectedIndices.length === 0
    ? 0
    : cart.reduce((sum, item, idx) =>
        selectedIndices.includes(idx)
          ? sum + item.product.price * item.quantity
          : sum
      , 0);

  if (!cart.length) return <div className="cart-empty">Your cart is empty.</div>;
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {cart.map((item, idx) => (
          <li key={item.product._id} className="cart-item">
            <input
              type="checkbox"
              checked={selectedIndices.includes(idx)}
              onChange={() => {
                setSelectedIndices(selectedIndices =>
                  selectedIndices.includes(idx)
                    ? selectedIndices.filter(i => i !== idx)
                    : [...selectedIndices, idx]
                );
              }}
              style={{ marginRight: '10px' }}
            />
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
      <div className="cart-total">Total: ${selectedTotal}</div>
      {!showPaymentOptions && (
        <button className="btn-main" onClick={handlePlaceOrderClick}>Place Order</button>
      )}
      {showPaymentOptions && (
        <div className="payment-options">
          <h3>Select Payment Method</h3>
          <label>
            <input
              type="radio"
              value="cod"
              checked={selectedPayment === 'cod'}
              onChange={() => setSelectedPayment('cod')}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="upi"
              checked={selectedPayment === 'upi'}
              onChange={() => setSelectedPayment('upi')}
            />
            UPI Payment
          </label>
          <label>
            <input
              type="radio"
              value="card"
              checked={selectedPayment === 'card'}
              onChange={() => setSelectedPayment('card')}
            />
            Credit Card
          </label>
          <button
            className="btn-main"
            onClick={handleConfirmPayment}
            disabled={!selectedPayment || isPlacingOrder}
            style={{ marginTop: '10px' }}
          >
            {isPlacingOrder ? 'Placing Order...' : 'Confirm Payment'}
          </button>
        </div>
      )}
      {msg && <div className="cart-msg">{msg}</div>}
    </div>
  );
};

export default Cart; 