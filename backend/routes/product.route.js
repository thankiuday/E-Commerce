// importing express using es6 import syntax
import express from 'express';
// importing the controller
import { getAllProducts,getFeaturedProducts,createProduct,deleteProduct,getRecommendedProducts,getProductByCategory,toggleFeaturedProduct} from '../controllers/product.controller.js';
// importing the protectRoute middleware
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';
// creating the router
const router = express.Router();

// getAll products route
router.get('/', protectRoute,adminRoute,getAllProducts);
// get featured products route
router.get('/featured',getFeaturedProducts);
// get product by category route
router.get('/category/:category',getProductByCategory);
// recommended products route
router.get('/recommendations',getRecommendedProducts);
// created a toggle featured product route
router.patch('/:id',protectRoute,adminRoute,toggleFeaturedProduct);
// create product route
router.post('/', protectRoute,adminRoute,createProduct);
// delete product route
router.delete('/:id', protectRoute,adminRoute,deleteProduct);

// exporting the router
export default router;