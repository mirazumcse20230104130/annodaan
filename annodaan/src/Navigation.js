import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="nav-bg">
    <Link to="/" className="btn-nav home-btn">Home</Link>
    <Link to="/donate" className="btn-nav donate-btn">Donate Here</Link>
    <Link to="/about" className="btn-nav about-btn">About Us</Link>
  </nav>
);

export default Navigation;