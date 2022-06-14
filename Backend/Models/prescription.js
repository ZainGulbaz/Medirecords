import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const prescription= new mongoose.Schema({

symptoms:{
    type:String,
    required:true
},
notes:{
    type:String,
    required:true
},
medicine:{
   type:String,
   required:true
},
amount:{
    type:Number,
    required:true
},
customer:{
    type:ObjectId,
    ref:"Customers"
},
visitDate:{
    type:String,
    required:true
}  

});


const Prescription= mongoose.model("prescription",prescription);
export default Prescription;