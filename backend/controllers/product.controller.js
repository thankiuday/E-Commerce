// importing the product model
import Product from "../models/product.model.js";
// importing the redis 
import { redis } from "../lib/redis.js";
// importing the cloudinary
import cloudinary from "../lib/cloudinary.js";

// creating the getAllProducts function
const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}); // find all products
		res.json({ products });
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// creating the getFeaturedProducts function
const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_Products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

		// if not in redis, get from DB
		featuredProducts = await Product.find({ isFeatured: true }).lean();
		if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" });
		}

		await redis.set("featured_Products", JSON.stringify(featuredProducts));
		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getting all products", error.message);
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

// ✅ UPDATED createProduct function with cloudinary try-catch
const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			try {
				cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
				console.log("Cloudinary response:", cloudinaryResponse);
			} catch (cloudErr) {
				console.error("Error uploading to Cloudinary:", cloudErr.message);
				return res.status(500).json({ message: "Failed to upload image", error: cloudErr.message });
			}
		} else {
			console.warn("⚠️ No image provided in request body");
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url || "",
			category,
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// creating the deleteProduct function
const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("Deleted image from Cloudinary");
			} catch (error) {
				console.log("Error deleting image from Cloudinary:", error.message);
			}
		}
		await Product.findByIdAndDelete(req.params.id);
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error deleting product:", error.message);
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

// creating the getRecommendedProducts function
 const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// creating the getProductByCategory function
const getProductByCategory = async (req, res) => {
	try {
		const products = await Product.find({ category: req.params.category });
		res.json({products});
	} catch (error) {
		console.log("Error getting product by category", error.message);
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

// creating the toggleFeaturedProduct function
const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			await product.save();
			await updateFeaturedProductsCache();
			res.json(product);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error toggling featured product", error.message);
		res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

// creating the updateFeaturedProductsCache function
const updateFeaturedProductsCache = async () => {
	try {
		let featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_Products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("Error updating featured products cache:", error.message);
	}
};

// exporting all functions
export {
	getAllProducts,
	getFeaturedProducts,
	createProduct,
	deleteProduct,
	getRecommendedProducts,
	getProductByCategory,
	toggleFeaturedProduct,
};
