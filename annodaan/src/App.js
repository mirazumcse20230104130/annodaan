import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import Home from './Home';
import DonateHere from './DonateHere';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<DonateHere />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;