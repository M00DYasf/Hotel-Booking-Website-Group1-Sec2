import { connect } from "mongoose";
import { config } from "../../config/config";

const connectDB = async () => {
  try {
    await connect(config.mongo.url);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;