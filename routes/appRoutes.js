import express from "express";
import authRoute from "./authRoute.js";
import stripeRoute from "./stripeRoute.js"
import { verifyUsedLogedIn } from "../middleware/verifyUsedLogedIn.js";

const app = express();
app.use("/auth", authRoute);
//app.use(verifyUsedLogedIn);
app.use("/stripe",stripeRoute);

export default app;
