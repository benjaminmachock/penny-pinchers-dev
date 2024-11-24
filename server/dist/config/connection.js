import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/penny_pinchers_db";
const db = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected");
        return mongoose.connection;
    }
    catch (err) {
        console.error("Database connection error: ", err);
        throw new Error("Database connection failed.");
    }
};
export default db;
