// import moongose 
import mongoose from 'mongoose';

// create a product schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    category:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

// creating model
const Product = mongoose.model('Product', productSchema);
// exporting the model
export default Product;