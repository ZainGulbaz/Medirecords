import express from "express";
import mongoose from "mongoose";
import Customer from "../Models/customer.js";
const prescriptionRouter= express.Router();
import Prescription from "../Models/prescription.js";


prescriptionRouter.get("/api/allprescriptions",async (req,res)=>{

    try{

   let prescriptions=[];
    let response= await Prescription.find().populate("customer");
    response.map(prescription=>{

        const{name,phone_number:phoneNumber,age,_id:id}=prescription?.customer;
        const{symptoms,notes,medicine,amount,_id}=prescription;
        prescriptions.push({
            id,
           name,
           phoneNumber,
           age,
           amount,
           symptoms,
           medicine,
           notes,
           prescriptionId:_id
        });

    })
    
    res.status(200).send(prescriptions);

    }
    catch(err){
    res.status(404).send(err);
    }

});

prescriptionRouter.post("/api/addprescription",async(req,res)=>{
    try{

const{symptoms,notes,medicine,amount,phoneNumber:phone_number,visitDate}=req.body;

let _customer= await Customer.find({phone_number});
const [customer]=_customer;
const {_id:id} = customer;
const prescription = new Prescription({
    symptoms,
    customer:id,
    notes,
    medicine,
    amount,
    visitDate
});

await prescription.save();
res.status(200).send({response:"The prescription has been added to the records"});

    }
catch(err){
    res.status(200).send("Here");

}
});

prescriptionRouter.delete("/api/deleteprescription",async(req,res)=>{
 
  try{
    await Prescription.findByIdAndDelete(req.body.id);
    res.status(200).send({res:"The prescription has been deleted"})

  }
  catch(err)
  {
      res.status(404).send({res:"The prescription cannot be deleted"});
  }

});

prescriptionRouter.get("/api/customerprescriptions",async(req,res)=>{

     try{
    
    
    //    let response= await Prescription.find({phoneNumber:req.query.phoneNumber});
       let customer= await Customer.findOne({phone_number:req.query.phoneNumber});
       let {_id:customerId}=customer;
       console.log(req.query.phoneNumber);
       let response=await Prescription.find({customer:customerId});
       console.log(response);
       res.status(200).send(response);
       


     }
catch(err){


}


});


export default prescriptionRouter;