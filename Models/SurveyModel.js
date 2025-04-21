import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema({
  title: String,
  subject: String,
  body: String,
  recipents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipent",
  }],
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateSent: Date,
  lastResponded: Date,
});

export const SurveyModel=mongoose.model("Survey",SurveySchema);