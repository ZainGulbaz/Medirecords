import express from "express";
import Customer from "../Models/customer.js";
import verifyToken from "../Middlewares/VerifyToken.js";
const app = express();
const customersRouter = express.Router();

//Get Customers API
customersRouter.get("/api/allcustomers",verifyToken, async (req, res) => {
  try { 
  if(!req.isUser)
  {
    res.status(404).send("You must be login First");
  }
  else{
    let obj = {};
    if (req.query.name !== undefined) {
      let { name } = req.query;
      obj = { name: { $regex: name } };
      console.log(obj);
    }
    let Customers = await Customer.find(obj);
    res.json({ Customers });
  }
  } catch (err) {
    res.json({ Error: err });
  }
});

//Add Customer API
customersRouter.post("/api/addcustomer", async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      phoneNumber: phone_number,
      address,
      symptoms,
      notes,
      firstVisit: first_visit,
      lastVisit: last_visit,
    } = req.body;

    const customer = new Customer({
      name,
      age,
      email,
      phone_number,
      address,
      symptoms,
      notes,
      first_visit,
      last_visit,
    });

    await customer.save();
    res.json({ respone: "The Data has been Inserted" });
  } catch (err) {
    res.json({ Error: err });
  }
});

//Update Customer API
customersRouter.put("/api/updatecustomer", async (req, res) => {
  try {
    const { id, symptoms, notes, lastVisit: last_visit } = req.body;
    await Customer.findByIdAndUpdate(id, { symptoms, notes, last_visit });
    res.json({ response: "The customer has been updated successfully" });
  } catch (err) {
    console.log(err);
  }
});

//Delete Customer API
customersRouter.delete("/api/deletecustomer",async(req,res)=>{
try{
 let response=await Customer.findByIdAndDelete(req.body.id);
 res.status(200).send("The customer has been deleted");

}
catch(err){
  console.log(err);
}
});


export default customersRouter;
