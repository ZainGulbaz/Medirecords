import mongoose from "mongoose";


const DBConnection=async()=>{
try{
   let connection= await mongoose.connect('mongodb://localhost:27017/CRM');
   if(connection){
   console.log("Connected to the Database");
   }
}

catch(err){
    console.log(err);
}

}
export default DBConnection;