import mongoose from "mongoose";
import 'dotenv/config';
import e from "cors";

const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        const result = await mongoose.connect(mongoUri);
        if(result){
            console.log('MongoDB Connected...');
        } 
    }
    catch(err){
        console.error(`MongoDB Connection Error:`, err);
        process.exit(1);
    }
};

export default connectDB;