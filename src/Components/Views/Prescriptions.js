import React, { useEffect, useState } from "react";
import { API_PREFIX } from "../../Constants";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import Axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { Card, CardText, CardBody, CardSubtitle } from "reactstrap";
import DataTable from "react-data-table-component";
import { alertAction } from "../../Redux/Actions/AlertAction";

const Prescriptions = () => {
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [medicine, setMedicine] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState({});
  const [prescriptionId, setPrescriptionId] = useState("");
  const [deleteModal,setDeleteModal]=useState(false);
  const dispatch = useDispatch();

  const columns = [
    {
      selector: "id",
      name: "ID",
    },
    {
      selector: "name",
      name: "Name",
      width:"250px"
    },
  
    {
      selector: "phoneNumber",
      name: "Phone Number",
      hide: 500,
      width:"150px"
    },
    {
      selector: "amount",
      name: "Amount",
      width:"100px"
    },

    {
      selector: "symptoms",
      name: "Symptoms",
      width:"400px"
     
    },
    {
      selector: "notes",
      name: "Notes",
      hide: 20000,
    },
    {
      selector: "medicine",
      name: "Medicine",
      hide: 20000,
    },
    {
      selector: "prescriptionId",
      name: "Prescription ID",
      hide: 20000,
    },
    {
      cell: (row) => (
        <Button
          color="success"
          onClick={() => {
            setViewData(row);
            setView(true);
          }}
          id={row.ID}
        >
          View
        </Button>
      ),
      width:"120px"
    
    },
    {
      cell: (row) => (
        <Button
          color="danger"
          onClick={() => {
            setDeleteModal(true);
            setPrescriptionId(row.prescriptionId);
          
          }}
        >
          Delete
        </Button>
      ),
      width:"120px"
    }
  ];
  const getPrescriptionsAPI = () => {
    Axios.get(`${API_PREFIX}/allprescriptions`)
      .then((res) => setPrescriptionData(res?.data))
      .catch(console.log);
  };

  useEffect(() => {
    getPrescriptionsAPI();
  }, []);

  

  const addPrescription = async () => {
    try {
      var today = new Date();
      var date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();
      let objData = {
        name,
        phoneNumber,
        notes,
        symptoms,
        medicine,
        amount,
        visitDate: date,
      };

    await Axios.post(`${API_PREFIX}/addprescription`, objData);  
    getPrescriptionsAPI();
      setModal(false);

      dispatch(alertAction(true,"The Prescription has been added","success"));
      setTimeout(()=>dispatch(alertAction(false,"","")),3000);


    } catch (err) {
      dispatch(alertAction(true,"The Prescription cannot be added","danger"));
      setTimeout(()=>dispatch(alertAction(false,"","")),3000);
    }
  };
  
  const deletePrescription=async()=>{
    try{
    let response= await Axios.delete(`${API_PREFIX}/deleteprescription`,{
      data:{
        id:prescriptionId
      }
    });
   getPrescriptionsAPI();
     dispatch(alertAction(true,"The Prescription has been delete","success"));
      setTimeout(()=>dispatch(alertAction(false,"","")),3000);
  }
    catch(err){

      dispatch(alertAction(true,"The Prescription cannot be delete","danger"));
      setTimeout(()=>dispatch(alertAction(false,"","")),3000);
    }

  }

  


  const searchCustomers=async()=>{
  
    try{
      let response= await Axios.get(`${API_PREFIX}/allcustomers`,{params:{
        name: name
      }});
    setPrescriptionData(response?.data);
    
    if(name.length==1)
    {
      getPrescriptionsAPI();
    }

    }

    catch(err){
      console.log(err);
    }
  }
const debounceOnChange=debounce(searchCustomers,500);
  return (
    <div className="p-2">
      {/* Add Prescription Modal  */}
      
      <Button color="primary" onClick={() => setModal(true)} className="mt-4 mb-4">
        Add Prescription
      </Button>
         
      <Modal isOpen={modal}>
        <ModalHeader>Add Customers</ModalHeader>
        <ModalBody>
          <Input
            placeholder=" Name"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="inputGroup mt-2">
         
            <Input
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
          </div>

       

          <div className="inputGroup mt-2">
            <Input
              placeholder="Symptoms"
              type="textarea"
              rows={3}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>

          <div className="inputGroup mt-2">
            <Input
              placeholder="Medicine"
              type="textarea"
              rows={3}
              onChange={(e) => setMedicine(e.target.value)}
            />
          </div>


          <div className="inputGroup mt-2">
            <Input
              placeholder="Notes"
              type="textarea"
              rows={5}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {
            setModal(false);
            addPrescription()}}>
            Add
          </Button>
          <Button color="secondary" onClick={() => setModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <DataTable
        columns={columns}
        data={prescriptionData}
        responsive={true}
        striped={true}
        highlightOnHover={true}
      />

      {/* Patient View Modal */}

      <Modal isOpen={view}>
        <ModalHeader>{viewData.name} Details</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <CardSubtitle className="text-secondary">{viewData.name}</CardSubtitle>
      
              <CardSubtitle className="text-secondary">
                Phone Number:{viewData.phoneNumber}
              </CardSubtitle>
          
              <CardText className="text-success">Amount Paid: {viewData.amount}</CardText>

              <CardText>
                <h6>Symptoms</h6>
                {viewData.symptoms}
              </CardText>

              <CardText>
                {" "}
                <h6>Medicine</h6>
                {viewData.medicine}
              </CardText>

              <CardText>
                {" "}
                <h6>Notes</h6>
                {viewData.notes}
              </CardText>

            
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setView(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      

      {/* Delete Modal */}
      <Modal isOpen={deleteModal}>
        <ModalHeader>Delete Customer</ModalHeader>
        <ModalBody>
         <h6>Are you sure you want to delete customer?</h6>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deletePrescription();
              setDeleteModal(false);
            }}
          >
            Delete
          </Button>
          <Button color="secondary" onClick={() => setDeleteModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Prescriptions;
