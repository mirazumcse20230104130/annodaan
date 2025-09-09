import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password) {
      alert(`Logged in as: ${username}`);
      // Pass username as state to /profile
      navigate('/profile', { state: { username } });
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Log In</h2>

        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />

          <div className="forgot">Forgot Password?</div>

          <button type="submit">Log In</button>
        </form>

        <div className="create-account">
          Don’t have an account? <Link to="/create-account">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
