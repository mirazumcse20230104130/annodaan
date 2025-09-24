import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CreateAccount.css'; // Reuse existing CSS

const Login = ({ setUserRole }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Debug
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', formData);
      console.log('Response Data:', res.data); // Debug full response
      alert(res.data.message);
      const { token, user } = res.data; // Extract token and user from response
      console.log('Token Extracted:', token); // Debug token
      setUserRole(user.role); // Store the role in parent state
      localStorage.setItem('token', token); // Store JWT token in localStorage
      console.log('Token Stored in localStorage'); // Debug storage
      // Optional: Redirect based on role
      // window.location.href = user.role === 'receiver' ? '/available-food' : '/';
    } catch (error) {
      console.log('Login Error:', error.response?.data || error.message); // Debug error
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="create-account"> {/* Reuse the same class */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don’t have an account? <Link to="/create-account">Create Account</Link></p>
    </div>
  );
};

export default Login;