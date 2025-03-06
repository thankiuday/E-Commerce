import Product from "../models/product.model.js";
export const addToCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;
        const existingItem =  user.cartItems.find((item) => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        }else{
            user.cartItems.push(productId);
        }
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.log("Error in adding product to cart", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });   
    }    
};

export const removeAllFromCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;
        if(!productId)
        {
            user.cartItems = [];
        }
        else{
            user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        }
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.log("Error in removing product from cart", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });   
        
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const {id:productId} = req.body;
        const {quantity} = req.body;
        const user = req.user;
        const existingItem = await user.cartItems.find((item) => item.id === productId);
        if(existingItem)
        {
            if(quantity === 0)
            {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
                await user.save();
                res.json(user.cartItems);
            }
            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);

        }
        else{
            res.status(404).json({message: "Product not found in cart"});
        }
    } catch (error) {
        console.log("Error in updating quantity of product in cart", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });   
    }
}

export const getAllCartItems = async (req, res) => {
    try {
        const products = await Product.find({_id: {$in: req.user.cartItems}});
        // add quantity to each product
        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find((cartItems) => cartItems.id === product._id);
            return{...product.toJSON(), quantity: item.quantity};
        }
        );
        res.json(cartItems);
            
    } catch (error) {
        console.log("Error in getting all cart items", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });   
    }
}