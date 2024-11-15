import express from "express";
import { OAuth2Client } from 'google-auth-library';
import axios from "axios";
import User from "../models/User.js";

const router = express.Router();

// Initialize Google OAuth2 Client with your Google Client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Route to handle Google OAuth login/signup
// router.get('/', async (req, res) => {
router.use(async (req, res,next) => {
  const { token } = req.body.header;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Verify the token with Google
    // const ticket = await client.verifyIdToken({
    //   idToken: token,
    //   audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // });
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);

    const payload = response.data; // Get the user's Google profile info
    const { sub, email, name } = payload; // 'sub' is the unique Google ID for the user

    // You can generate your own JWT or use sessions here if needed

    console.log(`User logged in: ${sub}, ${email}, ${name}`);

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        googleId: sub,
        email,
        name,
      });
      try {
        await user.save();
      } catch (saveError) {
        console.error('Error saving user:', saveError);
      }
      
    }
    req.customData = { user };

    console.log(user)

    next();
  } catch (error) {
    console.error('Error verifying Google token', error.message);
    return res.status(500).json({ error: 'Failed to authenticate user', details: error.message });
  }
});


router.get('/links',async(req,res)=>{
  const {category} = req.query;
  const u = req.body.customData;
  try{
    const user = await User.findOne(u.googleId)
    if(!user){
      return res.status(404).json({error:"user not found"})
    }
    if(category){
      let links = user.links.filter(link => link.category === category)
      res.status(200).json(links);
    }
    else
      res.status(200).json(user.links);
  }
  catch (error) {
    console.error("Error retrieving user's links:", error);
    return res.status(500).json({ error: 'Failed to retrieve links' });
  }
})

router.get('/categories', async(req,res)=>{
  const u = req.body.customData;
  try{
    const user = await User.findOne(u.googleId)
    if(!user){
      return res.status(404).json({error:"user not found"})
    }

    let categories = [...new Set(user.links.map(link=>link.category))]
    res.status(200).json(categories);
  }
  catch (error) {
    console.error("Error retrieving user's categories:", error);
    return res.status(500).json({ error: 'Failed to retrieve categories' });
  }
})

router.post('/',async(req,res)=>{
  const {category} = req.query;
  const u = req.body.customData;
  let desc=req.body.description;
  let url=req.body.url;
  
  if(!url)
    res.status(404).json({error:"url not found in body"})
  try{
    const user = await User.findOne(u.googleId)
    if(!user){
      return res.status(404).json({error:"user not found"})
    }
    if(category){
      user.links.push({
        description:desc,
        url:url,
        category:category,
      })
      user.save();
      let links = user.links.filter(link => link.category === category)
      res.status(200).json(links);
    }
    else{
      user.links.push({
        description:desc,
        url:url,
      })
      user.save();
      res.status(200).json(user.links);
    }
      
  }
  catch (error) {
    console.error("Error retrieving user's links:", error);
    return res.status(500).json({ error: 'Failed to retrieve links' });
  }
})



export default router;