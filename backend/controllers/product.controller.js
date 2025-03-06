// importing the product model
import Product from "../models/product.model.js";
// importing the redis 
import { redis } from "../lib/redis.js";
// importing the cloudinary
import cloudinary from "../lib/cloudinary.js";

// creating the the getAllProducts function
const getAllProducts = async (req, res) => {
    try {
        const product = Product.find({}); // empty object to get all the products
        res.json(product);
    } catch (error) {
        console.log("Error in getting all products", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// creating the getFeaturedProducts function
const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_Products")
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        // if it is not in redis cache then we will get it from the database
        featuredProducts = await Product.find({ isFeatured: true }).lean();
        // .lean() method is used to get the plain javascript object instead of mongoose document
        // which is faster to process
        if (!featuredProducts) {
            return res.status(404).json({ message: "No featured products found" });
        }
        // storing the featured products in the redis cache
        await redis.set("featured_Products", JSON.stringify(featuredProducts));
        res.json(featuredProducts);
    } catch (error) {
        console.log("Error in getting all products", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// creating the createProduct function
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, images, isFeatured } = req.body;
        let cloudinaryResponse = null;
        if (images) {
            cloudinaryResponse = await cloudinary.uploader.upload(images, { folder: "products" });
        }
        // creating a new product document
        const product = new Product({
            name: name,
            description: description,
            price: price,
            category: category,
            images: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            isFeatured: isFeatured
        });
        // saving the product
        await product.save();
        res.status(201).JSON(product);
    } catch (error) {
        console.log("Error in creating product", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// creating the deleteProduct function
const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];// this will get the id of the image
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("deleted image from clooudnary")
            } catch (error) {
                console.log("Error in deleting image from cloudinary", error.message);

            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in deleting product", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// creating the getRecommendedProducts function
const getRecommendedProducts = async (req, res) => {
    try {
        const product = await Product.aggregate([
            {
                $sample: { size: 5 }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    images: 1
                }
            }
        ]);
        res.json(product);
    } catch (error) {
        console.log("Error in getting reccomedation product", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// creating the getProductByCategory function
const getProductByCategory = async (req, res) => {
    try {
        const product = await Product.find({ category: req.params.category });
        res.json(product);
    }
    catch (error) {
        console.log("Error in getting product by category", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// creating the toggleFeaturedProduct function
const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            // if the product is featured then we will make it unfeatured and vice versa
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductsCache();
        }
        else {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        console.log("Error in toggling featured product", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
// creating the updateFeaturedProductsCache function
const updateFeaturedProductsCache = async () => {
    // lean() method is used to get the plain javascript object instead of mongoose document
    // which is faster to process
    try {
        let featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_Products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in update cashe function", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    
}
// exporting the all the function
export { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts, getProductByCategory, toggleFeaturedProduct };
