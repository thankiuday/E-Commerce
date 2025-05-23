// importing express using es6 import syntax
import express from 'express';
 import path from 'path';


// importing MongoDB connection
import {connectDB} from './lib/db.js';

// importing the authRoutes
import authRoutes from './routes/auth.route.js';
// importing the product routes
import productRoutes from './routes/product.route.js';
// importing the cart routes
import cartRoutes from './routes/cart.route.js';
// importing the coupon routes
import coupenRoutes from './routes/coupon.route.js';
// importing the payment routes
import paymentRoute from './routes/payment.route.js';

// importing the analytics routes
import analyticsRoutes from './routes/analytics.route.js';

// importing dotenv to use environment variables
import dotenv from 'dotenv';

// importing the body parser
import bodyParser from 'body-parser';

// importing cookie parser
import cookieParser from 'cookie-parser';

// calling the config method of dotenv
dotenv.config();

// creating an express app
const app = express();

// using express json middleware to parse the body of the request
app.use(express.json({limit:"10mb"}));

// using body parser
app.use(bodyParser.json()); 

// using cookie parser
app.use(cookieParser());

// setting up the port
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// setting up the route
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/coupons",coupenRoutes);
app.use("/api/payments",paymentRoute);
app.use("/api/analytics", analyticsRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
// listening to the port
app.listen(PORT, (req, res) => {
  console.log('Server is running on http://localhost:'+PORT);
  // connect to the database
  connectDB();
});
