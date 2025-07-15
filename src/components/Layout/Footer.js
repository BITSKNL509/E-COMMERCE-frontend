import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer id="footer" className="footer">
    <div id="about" className="footer-section">
      <h3>About</h3>
      <p>
      Welcome to Ease-Shop a modern e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). We offer a smooth and secure shopping experience where users can browse products, add items to a cart, and place orders easily. Our admin panel allows full control over products and orders, making management simple and efficient.
      </p>
    </div>
    <div id="contact" className="footer-section">
      <h3>Contact</h3>
      <p>
        Email: support@eshop.com<br />
        Phone: +1 234 567 8901<br />
        Address: 123 Market Street, City, Country
      </p>
    </div>
    <div className="footer-bottom">
      &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
    </div>
  </footer>
);

export default Footer;