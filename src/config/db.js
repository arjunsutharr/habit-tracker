import mongoose from "mongoose";
import { addRecord } from "../controllers/habit.controller.js";

const baseURI = process.env.mongoURI;

export const connectDB = async () => {
  try {
    console.log("db connecting...");
    const res = await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected using mongoose");
    addRecord();
  } catch (error) {
    console.log("mongodb connection failed");
    console.log(error);
  }
};
