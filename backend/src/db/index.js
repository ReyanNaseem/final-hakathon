import mongoose from 'mongoose';
import { DB_NAME } from '../contant.js';

const connectDB = async(req,res)=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(connectionInstance.connection.host);
        console.log('MongoDb connected')
    } catch (error) {
        console.log(`mongodb connection failed!!`,error)
        process.exit(1);
    }
}

export default connectDB;