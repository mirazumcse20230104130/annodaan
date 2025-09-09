import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import connectDb from './db/connect.js';
import donateRoutes from './routes/routes.js';

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/donate', donateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
