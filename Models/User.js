import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
   googleId:{
    type:String,
    required:true
   },
   credits:{
      type:Number,
      default:0
   }
})

export const User=mongoose.model("User",UserSchema);