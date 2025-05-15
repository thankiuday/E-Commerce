// importing express using es6 import syntax
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getCoupon,validateCoupon } from '../controllers/coupon.controller.js';
// setting up the router
const router = express.Router();

// getCoupon route
router.get('/', protectRoute,getCoupon);
// validating the coupon route
router.post('/validate', protectRoute,validateCoupon);

// exporting the router
export default router;