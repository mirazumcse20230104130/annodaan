import React from 'react';
import logo from './images/logo.png'; // Verify this path

const Header = () => (
  <header className="header-bg">
    <img src={logo} alt="Logo" className="logo-img me-2" onError={(e) => { e.target.style.display = 'none'; console.log('Image failed to load'); }} />
    <div className="header-content">
      <h1>Annodaan</h1>
      <p>From surplus to support!</p>
    </div>
  </header>
);

export default Header;