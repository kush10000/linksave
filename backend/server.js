import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import auth from './routes/auth.js';

dotenv.config();

const app = express();

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST'], // Allowed methods
  credentials: true, // Allow credentials
};

// Use CORS with options
app.use(cors(corsOptions)); 
app.use(express.json());
app.use('/auth', auth);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
