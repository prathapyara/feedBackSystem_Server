import { SurveyModel } from "../Models/SurveyModel.js";
import { RecipentModel } from "../Models/RecipentModel.js";
import { sendMail } from "../services/Email.js";
import { emailTemplate } from "../utils/emailTemplate.js";
import { User } from "../Models/User.js";
import mongoose from "mongoose";

export const createSurvey = async (req, res) => {
  try {
    const { title, subject, body, recipents } = req.body;

    //recipent is the , separated string
    const ArrayRecipent = recipents.split(",");
    const newSurvey = await SurveyModel.create({
      title: title,
      subject: subject,
      body: body,
      user: req.user.id,
      dateSent: Date.now(),
    });
    const recipentIds = await Promise.all(
      ArrayRecipent.map(
        async (recipent) =>
          await RecipentModel.create({
            recipentEmail: recipent.trim(),
            surveyID: newSurvey._id,
          })
      )
    );
    newSurvey.recipents = recipentIds.map((r) => r._id);
    const survey = await newSurvey.save();
    const SurveyMembers = await SurveyModel.findById(survey._id).populate({
      path: "recipents",
      select: "recipentEmail",
    });
    const emails = SurveyMembers.recipents.map(
      (recipent) => recipent.recipentEmail
    );
    const msg = {
      to: emails,
      from: "prathapyara123@gmail.com",
      subject: subject,
      text: "Rate the Service",
      html: emailTemplate(body, survey._id, subject),
    };
    await sendMail(msg);
    console.log(req.user);
    const user = await User.findOneAndUpdate(
      { googleId: req.user.googleId },
      { $inc: { credits: -1 } },
      {
        new: true,
      }
    );
    console.log(user);
    res.status(201).json({ message: "new survery has been created" });
  } catch (error) {
    console.log(error);
  }
};

export const getSurveys = async (req, res) => {
  try {
   
    const surveys = await SurveyModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $project: {
          title: 1,
          yes: 1,
          no: 1,
          SurveyCount: { $size: "$recipents" },
        },
      },
    ]);
    //const surveys = await SurveyModel.find({ user: req.user.id }).select({title:1,yes:1,no:1});
    res.status(200).json({ surveys: surveys });
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificSurvey = async (req, res) => {
  res.status(200).json({ mssage: "Details of the sepacific survey" });
};

//we get the req.body of webhook we are extracting the email,suveryid,reponse and then storing them all the reponses as an array then from the array we will get the recipent details and check wheere he already sent the repsonse if not we need to udpaye the suvery feedbakc yes and no and update the checked n recipents model

export const webhook = async (req, res) => {
  const responseArray = req.body.map((event) => {
    const urlArray = event.url.split("/");
    return {
      recipentEmail: event.email,
      surveyID: urlArray[urlArray.length - 2],
      response: urlArray[urlArray.length - 1],
    };
  });

  for (const response of responseArray) {
    try {
      if (!["yes", "no"].includes(response.response)) continue;
      if (!mongoose.Types.ObjectId.isValid(response.surveyID)) continue;

      const updatedRecipent = await RecipentModel.findOneAndUpdate(
        {
          recipentEmail: response.recipentEmail,
          surveyID: response.surveyID,
          checked: false,
        },
        { $set: { checked: true } }
      );

      if (updatedRecipent) {
        const updateField =
          response.response === "yes" ? { yes: 1 } : { no: 1 };
        await SurveyModel.findByIdAndUpdate(response.surveyID, {
          $inc: updateField,
          lastResponded: Date.now(),
        });
        console.log("Feedback updated successfully");
      } else {
        console.log("User has already responded.");
      }
    } catch (error) {
      console.log("Webhook error:", error);
    }
  }

  res.status(200).json({ message: "Webhook processed" });
};
