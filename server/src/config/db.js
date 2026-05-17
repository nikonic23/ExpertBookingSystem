import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MONGO_URI is not set. Server started without MongoDB.");
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log("MongoDB Connected");
    return true;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.error(
      "Server is still running. Check MONGO_URI, DNS/internet, and MongoDB Atlas Network Access."
    );
    return false;
  }
};

export default connectDB;
