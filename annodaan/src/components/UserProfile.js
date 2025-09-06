import React, { useState } from 'react';
import '../index.css';

function UserProfile() {   
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert('Data saved!');
    setEditable(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h2>Annodaan</h2>
        <p>From surplus to support!</p>
      </header>

      <nav className="navbar">
        <div className="nav-links">
          <span>Home</span>
          <span>Latest</span>
          <span>About Us</span>
        </div>
        
      </nav>

      <div className="profile-box">
        <h3 className="profile-title">User Profile</h3>
        <div className="profile-content">
          <div className="info">
            <label>Username</label>
            <input
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter Username"
              disabled={!editable}
            />

            <label>Email Id</label>
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter Email"
              disabled={!editable}
            />

            <label>Phone</label>
            <input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              disabled={!editable}
            />

            <label>Address</label>
            <input
              name="address"
              value={user.address}
              onChange={handleChange}
              placeholder="Enter Address"
              disabled={!editable}
            />
          </div>

          <div className="image-box">🖼️</div>
        </div>

        <div className="button-group">
          <button onClick={() => setEditable(true)}>Edit</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
