import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import appRoute from "./routes/routes.js"
import { dbCOnnect } from "./DB/config.js";
import cookieSession from "cookie-session";

dbCOnnect();
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60*1000,
    keys: [process.env.COOKIE_SESSION],
  })
);
app.use(passport.session());
app.use(passport.initialize());

app.use("/", appRoute);
app.get("/",(req,res)=>{
    res.send(req.user);
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is listening to port ${PORT}`)
});

