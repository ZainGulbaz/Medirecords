import express from "express";
const userRouter = express.Router();
import User from "../Models/user.js";
import jwt from "jsonwebtoken";


userRouter.get("/api/users",async(req,res)=>{
try{

    let response =await User.find({email:req.query.email});
    res.status(200).send(response);

}
catch(err){
    res.status(404).send("Error");
}
   
});

//authorization: bearer <token>




userRouter.post("/api/login",async (req,res)=>{
    
    try{
    var token;
    const {email,password}=req.body;
    if(!email || !password)
    {
        res.status(404).json({response:"Enter valid username or password"});
    }
    else {
        
        let user=await User.findOne({email});
        const {_id:id}=user;  
        if(user.password===password)
        {
            token=  jwt.sign({id},"medicalSHA256");
        }
        res.status(200).json({response:token});
    }     

    }
    catch(err){
        res.status(404).send("Error");
    }

});


export default userRouter;