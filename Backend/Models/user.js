import mongoose from "mongoose";

const user=mongoose.Schema({

email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    require:true
}

});

const User=mongoose.model("user",user);
export default User;