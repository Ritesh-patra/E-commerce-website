import mongoose from "mongoose"
import Product from "../model/productModel.js";



const connectDB = async () => {
    let connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo Connected Db Host ${connectionDb.connection.host}`);
}

export default connectDB;