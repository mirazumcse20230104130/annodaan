import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const handleSectionChange = (section) => {
    setIsDropdownOpen(false);
    const event = new CustomEvent('navSectionChange', { detail: section });
    window.dispatchEvent(event);
    console.log('Nav section selected:', section);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/donate', label: 'Donate Here' },
    { path: '/about', label: 'About Us', hasDropdown: true },
    { path: '/create-account', label: 'Sign In' },
  ];

  return (
    <nav className="nav-bg">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        if (item.hasDropdown) {
          return (
            <div key={item.path} className="dropdown" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
              <Link to={item.path} className={`btn-nav ${isActive ? 'active' : ''}`}>
                {item.label} {isDropdownOpen ? '▲' : '▼'}
              </Link>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <div className="dropdown-item" onClick={() => handleSectionChange('mission')}>Mission</div>
                  <div className="dropdown-item" onClick={() => handleSectionChange('team')}>Team</div>
                </div>
              )}
            </div>
          );
        }
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`btn-nav ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;