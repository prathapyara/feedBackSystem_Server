import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import appRoute from "./routes/appRoutes.js"
import { dbCOnnect } from "./DB/config.js";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";

dbCOnnect();
dotenv.config();
const app=express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use("/api/stripe/webhook", bodyParser.raw({ type: "application/json" }));

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60*1000,
    keys: [process.env.COOKIE_SESSION],
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/api", appRoute);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is listening to port ${PORT}`)
});

