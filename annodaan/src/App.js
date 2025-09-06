import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import MainContent from './MainContent';
import DonateHere from './DonateHere';
import DonateFood from './DonateFood';
import AboutUs from './AboutUs';

function App() {
  return (
    <Router>
      <Header />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/donate" element={<DonateHere />} />
        <Route path="/donate-food" element={<DonateFood />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;