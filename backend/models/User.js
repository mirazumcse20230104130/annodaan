import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },   // ✅ Name is now required
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
             // optional
  createdAt: { type: Date, default: Date.now }
});

// Export default so you can import like: import User from '../models/User.js'
export default mongoose.model('User', userSchema, 'create_users');
