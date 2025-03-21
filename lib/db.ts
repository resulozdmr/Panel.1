import mongoose from "mongoose";

let isConnected: boolean = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected.");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    const res = await mongoose.connect(process.env.MONGO_URI!);
    isConnected = res.connection.readyState === 1;
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
