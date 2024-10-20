import express from "express";
import { OAuth2Client } from 'google-auth-library';
import axios from "axios";
// Import your User model (uncomment when you're using it)
// import User from '../models/User'; 
const router = express.Router();

// Initialize Google OAuth2 Client with your Google Client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Route to handle Google OAuth login/signup
router.post('/google', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Verify the token with Google
    // const ticket = await client.verifyIdToken({
    //   idToken: token,
    //   audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // });
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);

    const payload = response.data; // Get the user's Google profile info
    const { sub, email, name } = payload; // 'sub' is the unique Google ID for the user

    // Check if user already exists in the database
    // Uncomment this block when User model is defined
    /*
    let user = await User.findOne({ googleId: sub });

    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        googleId: sub,
        email,
        name,
        picture, // Store the user's profile picture as well
      });
      await user.save();
    }
    */

    // You can generate your own JWT or use sessions here if needed
    res.status(200).json({ 
      message: 'User logged in successfully',
      user: { googleId: sub, email, name } // Return user information if necessary
    });

    console.log(`User logged in: ${sub}, ${email}, ${name}`);
  } catch (error) {
    console.error('Error verifying Google token', error);
    res.status(500).json({ error: 'Failed to authenticate user', details: error.message });
  }
});

export default router;