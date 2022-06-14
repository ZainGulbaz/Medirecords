import jwt from "jsonwebtoken";

const verifyToken=async (req,res,next)=>{
    
try{
    const {authorization}= req.headers;
    const bearer=authorization.split(" ");
    const token=bearer[1]; 
    const isUser=jwt.verify(token,"medicalSHA256");
    req.isUser=isUser;     
    next();
}
catch(err)
{
    req.isUser=false;
    next();
}

    }
    export default verifyToken;