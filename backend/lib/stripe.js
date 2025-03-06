// import stripe 
import Stripe from 'stripe';
// import dotenv
import dotenv from 'dotenv';
// config dotenv
dotenv.config();
// export stripe and put secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);