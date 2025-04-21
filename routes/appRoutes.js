import express from "express";
import authRoute from "./authRoute.js";
import stripeRoute from "./stripeRoute.js";
//import { verifyUsedLogedIn } from "../middleware/verifyUsedLogedIn.js";
import surveyRoute from "./surveyRoute.js";

const app = express();
app.use("/auth",authRoute);
//app.use(verifyUsedLogedIn);
app.use("/stripe",stripeRoute);
app.use("/survey",surveyRoute);

export default app;
