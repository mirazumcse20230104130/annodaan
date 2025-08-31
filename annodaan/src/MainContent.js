import React from 'react';
import communityImage from './images/community.jpg'; // Ensure this exists

const MainContent = () => (
  <div className="content-bg">
    {/* Left side: text + image */}
    <div className="left-content">
      <div className="image-text-wrapper">
        <div className="text-next-to-image">
          <h2>Annodaan</h2>
          <p>
            Annodaan (অন্নদান) is a community-driven platform dedicated to reducing food waste
            and feeding those in need.
          </p>
        </div>
        <img src={communityImage} alt="Community Image" className="community-img" />
      </div>

      {/* Rest of the content below */}
      <p>
        We believe that no one should sleep hungry while good food goes to waste. Through
        Annodaan, individuals, restaurants, event organizers, and households can easily donate
        surplus food to nearby NGOs, shelters, and people in need.
      </p>
      <p>
        Whether it’s a warm meal from a restaurant, leftovers from a celebration, or extra
        groceries from your home — every contribution matters. With the help of our volunteers,
        we ensure safe, respectful, and timely food delivery to those who need it most.
      </p>
    </div>

    {/* Right side: buttons */}
    <div className="right-content">
      <button className="btn-custom">Need Food</button>
      <button className="btn-custom">Donate Food</button>
      <button className="btn-custom">Volunteer</button>
    </div>
  </div>
);

export default MainContent;
