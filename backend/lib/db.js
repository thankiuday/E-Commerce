import moongoose from 'mongoose';
// create a connection function
export const connectDB = async () => {
    try {
        // connect to the database
        const conn = await moongoose.connect(process.env.MONOGO_URI);
           console.log('Database connected successfully'); 
    } catch (error) {
        console.log('Error while connecting to the database', error.message);   
        process.exit(1);
    }
}