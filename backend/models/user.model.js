// importing mongoose using es6 import syntax
import mongoose from 'mongoose';

// importing bcrypt to hash the password
import bcrypt from 'bcryptjs';

// create a user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        trim : true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6,"Password must be atleast 6 characters long"],
    },
    cartItems:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            }
        }
    ],
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
},{timestamps: true});

// pre save middleware to hash the password before saving the user to the database
userSchema.pre('save', async function(next) {
    // check if the password is modified
    if(!this.isModified('password')){
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// method to compare the password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


// create a user model
const User = mongoose.model('User', userSchema);

// export the user model
export default User;