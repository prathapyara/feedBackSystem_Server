import mongoose from "mongoose";

const recipentSchema = new mongoose.Schema({
  recipentEmail: String,
  surveyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

export const RecipentModel=mongoose.model("Recipent",recipentSchema)