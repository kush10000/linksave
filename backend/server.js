import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import auth from './routes/auth.js';

dotenv.config();

const app = express();

// Define CORS options
const corsOptions = {
  origin: ['http://localhost:5173', 'https://linksave.netlify.app', 'http://linksave.netlify.app'], // Add both local and deployed client URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  credentials: true, // Allow credentials
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any custom headers if necessary
  exposedHeaders: ['Authorization'] // Expose any headers if needed on the client side
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