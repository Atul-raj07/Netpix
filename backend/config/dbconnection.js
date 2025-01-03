import mongoose from "mongoose";
import { envVars } from "./envVars.js";

export const connectDB = async () => {
    
    try {
    const connect =  await mongoose.connect(envVars.MONGO_URI);
      console.log('MongoDB Connected:'+ connect.connection.host);
    } catch (error) {
      console.error('MongoDB Connection Error:', error.message);
      process.exit(1); // Exit the process if the connection fails
    }
  };
  