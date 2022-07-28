import mongoose from "mongoose"

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
    console.log('connected to mongodb')
  } catch(err) {
    console.log(err)
  }
}