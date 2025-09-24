import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Header from "./Header";
import CreateAccount from "./CreateAccount";
import MainContent from "./MainContent";
import DonateHere from "./DonateHere";
import AboutUs from "./AboutUs";
import DonateFood from "./DonateFood";
import Login from "./Login"; // Import Login component

function App() {
  const [userRole, setUserRole] = useState(null); // Global state for user role

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
          <Route path="/donate-food" element={<DonateFood />} />
          <Route path="/login" element={<Login setUserRole={setUserRole} />} /> {/* Add Login route */}
          {/* Placeholder for available food route (to be created) */}
          {/* <Route path="/available-food" element={<AvailableFood userRole={userRole} />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;