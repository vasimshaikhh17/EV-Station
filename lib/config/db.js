import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    mongoose.connect(process.env.MONGOOSE_URI)
    .then(() => console.log("DB connected"))
    .catch(error => console.error("DB connection error:", error));
  
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error; 
  }
};