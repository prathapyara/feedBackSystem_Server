import { SurveyModel } from "./Models/SurveyModel.js";
import { RecipentModel } from "./Models/RecipentModel.js";
import mongoose from "mongoose";


const dbCOnnect=async()=>{
    try {
        await mongoose.connect(
          "mongodb+srv://prathapyara:V3j5WslYclyZ4wjZ@cluster0.0149m.mongodb.net/feedbackDB?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("mongodb database as been connected");
    } catch (error) {
        console.log("Unable to connenct to mongodb");
    }
}

dbCOnnect();

const deleterecords=async()=>{
    await SurveyModel.deleteMany({});
    await RecipentModel.deleteMany({});
    console.log("deleted successfully");
}

deleterecords();