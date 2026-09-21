import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

if(!MONGODB_URL) {
    throw new Error("mongodb url is missing please check your local .env");
}

export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URL as string);
        console.log("mongodb connected successfully...");
    } catch (error) {
        console.error("mongodb connection failed");
        throw new Error("mongodb connection failed");
    }
}