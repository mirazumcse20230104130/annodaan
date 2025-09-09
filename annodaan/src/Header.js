import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

const Header = () => (
  <header className="header-bg">
    <Link 
      to="/" 
      className="header-content-link" 
      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
    >
      <img 
        src={logo} 
        alt="Logo" 
        className="logo-img me-2" 
        onError={(e) => { 
          e.target.style.display = 'none'; 
          console.log('Image failed to load'); 
        }} 
      />
      <div className="header-content">
        <h1>Annodaan</h1>
        <p>From surplus to support!</p>
      </div>
    </Link>
  </header>
);

export default Header;
