import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import MainContent from "./MainContent";
import DonateHere from "./DonateHere";

function App() {
  return (
    <Router>
      <Header />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/donate" element={<DonateHere />} />
      </Routes>
    </Router>
  );
}

export default App;
