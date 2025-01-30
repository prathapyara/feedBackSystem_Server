import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send({name:"Prathap"})
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is listening to port ${PORT}`)
});