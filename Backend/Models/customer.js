import mongoose from "mongoose";

//Customer Schemea

const customerSchema=mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:false
},
phone_number:{
    type:String,
    required:true,
    unique:true
},
age:{
    type:Number,
    required:false
},
address:{
    type:String,
    required:false 
},
symptoms:{
    type:String,
    required:false
},
notes:{
    type:String,
    required:false
},
first_visit:{
    type:String,
    required:false

},
last_visit:{
    type:String,
    required:false
}



});

const Customer=mongoose.model("Customers",customerSchema);
export default Customer;