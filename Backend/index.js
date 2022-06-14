import express from "express";
import cors from "cors";
import "dotenv/config";
import DBConnection from "./Database/DBConnection.js";
import customersRouter from "./Routes/customers.js";
import prescriptionRouter from "./Routes/prescription.js";
import userRouter from "./Routes/user.js";
const app=express();


//Middlewares   
app.use(express.json());
app.use(cors());


//PORT
const PORT=process.env.PORT || 5050;


//DB Connection
DBConnection();

//Testing API
app.get("/test",(req,res)=>{
    

    res.json({name:"Zain"});
    

});
//Routes
app.use(customersRouter);
app.use(prescriptionRouter);
app.use(userRouter);



//Listen to the PORT
app.listen(PORT,()=>console.log("Connected to "+PORT));

