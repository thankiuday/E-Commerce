// import express using es6 import syntax
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { createCheckoutSession,checkoutSuccess} from '../controllers/payment.controller.js';
// creating an express router
const router = express.Router();

router.post("/create-checkout-session", protectRoute,createCheckoutSession);
router.post("/checkout-success", protectRoute,checkoutSuccess);

// exporting the router
export default router;