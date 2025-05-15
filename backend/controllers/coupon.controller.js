// import the Coupon model
import Coupon from '../models/coupon.model.js';
export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({userId: req.user._id, isActive: true});
        res.json(coupon || null);
    }  catch (error) {
        onsole.log("Error is coupon getCoupon controller",error);
        res.status(500).json({message: error.message});
    }
};
export const validateCoupon = async (req, res) => {
    try {
        // getting the code from body
        const {code} = req.body;
        // finding the coupon in database, and also the users userID add isActive or not
        const coupon = await Coupon.findOne({code:code,userId:req.user._id,isActive:true});
        // if coupon is not found 
        if(!coupon){
            return res.status(400).json({message: "Invalid  coupon code"});
        }
        // if coupon is expired
        if(coupon.expirationDate < new Date()){
            coupon.isActive = false;
            await coupon.save();
            return res.status(400).json({message: "Coupon is expired"});
        }
        // if coupon is valid and passed this all cheaks
        res.json(
            {message: "Coupon is valid",
            code: coupon.code,
            discount: coupon.discountPercentage,
            }
        );

    } catch (error) {
        console.log("Error in coupon validateCoupon controller",error);
        res.status(500).json({message: error.message});
        
    }
}