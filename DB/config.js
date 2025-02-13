import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const dbCOnnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log("mongodb database as been connected");
    } catch (error) {
        console.log("Unable to connenct to mongodb");
    }
}