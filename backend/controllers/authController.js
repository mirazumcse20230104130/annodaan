import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Added for JWT

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10); // Default 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Registration - Email:', email, 'Input Password:', password, 'Hashed Password:', hashedPassword); // Debug

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user: { name, email, role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login Attempt - Email:', email, 'Input Password:', password); // Debug input
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    console.log('Stored User:', user); // Debug full user object
    console.log('Stored Hashed Password:', user.password); // Debug stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match:', isMatch); // Debug match result
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    };
    const secret = process.env.JWT_SECRET || 'your-secure-secret-key';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};