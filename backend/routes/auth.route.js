// importing express using es6 import syntax
import express from 'express';
// importing the controller
import {signup, login, logout,refreshToken,getProfile} from '../controllers/auth.controller.js';
// creating the router
const router = express.Router();

// if the user get signup route
router.post('/signup',signup);
// if the user get longin route
router.post('/login',login);
// if the user get logout route
router.post('/logout',logout);
// refresh token
router.post('/refresh-token',refreshToken);
// get user profile
router.get('/profile', getProfile);
// exporting the router
export default router;

