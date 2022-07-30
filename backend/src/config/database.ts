import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};
