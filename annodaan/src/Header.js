import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png'; // Adjust path based on your images folder

const Header = () => (
  <header className="header-bg">
    <img src={logo} alt="Logo" className="logo-img me-2" />
    <div className="header-content">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>Annodaan</h1>
      </Link>
      <p>From surplus to support!</p>
    </div>
  </header>
);

export default Header;