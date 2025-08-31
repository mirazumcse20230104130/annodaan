import React from 'react';
import logo from './images/logo.png'; // Ensure this image exists

const Header = () => (
  <header className="header-bg">
    <img src={logo} alt="Logo" className="logo-img me-2" />
    <div className="header-content">
      <h1>Annodaan</h1>
      <p>From surplus to support!</p>
    </div>
  </header>
);

export default Header;