import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Header from "./Header";
import CreateAccount from "./CreateAccount";
import MainContent from "./MainContent";
import DonateHere from "./DonateHere";
import AboutUs from "./AboutUs";

function App() {
  return (
    <Router>
      <Header />
      <Navigation />
      <div className="app-content">
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/" element={<MainContent />} />
          <Route path="/donate" element={<DonateHere />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;