import mongoose from "mongoose";

export const connectMongo = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/reviewDB");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
