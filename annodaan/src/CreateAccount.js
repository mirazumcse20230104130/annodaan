import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CreateAccount.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'general', // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Debug
    try {
      const res = await axios.post(
        'http://localhost:5001/api/auth/register', // Matches your backend port
        formData
      );
      alert(res.data.message);
      // Clear the form after success
      setFormData({ name: '', email: '', password: '', role: 'general' });
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked');
  };

  return (
    <div className="create-account">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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

        <label htmlFor="role">User Type</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="general">General User</option>
          <option value="receiver">Receiver</option>
        </select>

        <button type="submit">Create Account</button>
      </form>

      <button className="google-btn" onClick={handleGoogleSignIn}>
        Sign Up with Google
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default CreateAccount;