// import express using es6 import syntax
import express from 'express';
// importing the controller
import { addToCart,removeAllFromCart,updateQuantity,getAllCartItems } from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

// creating the router
const router = express.Router();

// get route for getting all the products in the cart
router.get('/',protectRoute,getAllCartItems);
// creating post route for adding product to cart
router.post('/',protectRoute,addToCart);
// remove from cart route - delete a single cart item along with its quantity 
router.post('/', protectRoute, removeAllFromCart);
// updating the quantity of the product in the cart
router.put('/:id', protectRoute, updateQuantity);
// exporting the router
export default router;