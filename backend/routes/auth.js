import express from 'express';
import { register, login } from '../controllers/authController.js'; // Import both register and login

const router = express.Router();

router.post('/register', register);
router.post('/login', login); // Add login route

export default router;