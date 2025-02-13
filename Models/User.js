import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
   googleId:{
    type:String,
    required:true
   }
})

export const User=mongoose.model("users",UserSchema);