import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { name, email, password, university } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword, university });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user: { name, email, university } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
