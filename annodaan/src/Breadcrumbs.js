import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbItems = [
    { path: '/', label: 'Home' },
    { path: '/donate', label: 'Donate Here' },
    { path: '/about', label: 'About Us' },
  ];

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-bg">
      <ol className="breadcrumb breadcrumb-custom">
        {breadcrumbItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.path}
              className={`breadcrumb-item ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive ? (
                item.label
              ) : (
                <Link to={item.path}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
