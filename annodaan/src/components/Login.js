import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //  Import for navigation
import '../index.css'; 
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    
    if (username && password) {
      alert(`Logged in as: ${username}`);
      navigate('/profile'); 
    } else {
      alert('Please enter username and password');
    }
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
        <div className="icon">👤</div>
      </nav>

      <div className="login-box">
        <h3 className="login-title">Log In</h3>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />

          <p className="forgot">Forgot Password?</p>

          <button type="submit">Log In</button>
        </form>
        <p className="create-account">Don't Have an Account? Create Account</p>
      </div>
    </div>
  );
}

export default Login;
