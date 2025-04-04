import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed. ", error);
    process.exit(1); //Since we need the DB connection for this application to work we'll exit here.
  }
};

export default connectDB;
