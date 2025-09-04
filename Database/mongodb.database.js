import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/mongodb.config.js";

export const connectToDatabase = async () => {
  try {
    if (!MONGODB_URI) {
      console.error(
        `MONGODB_URI is not defined in ${NODE_ENV} environment variables.`
      );
    }

    // telling Mongoose “connect to MongoDB, keep between 2–10 connections ready, and if you can’t connect within 5 seconds, fail fast.”
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10, // maximum number of connections in the pool
      minPoolSize: 2, // keep at least 2 connections alive
      serverSelectionTimeoutMS: 5000, // timeout if DB not reachable
    });
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
