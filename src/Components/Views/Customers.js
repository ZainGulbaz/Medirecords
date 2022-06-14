import React, { useEffect, useState } from "react";
import { API_PREFIX } from "../../Constants";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
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
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [customersData, setCustomersData] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState({});
  const [updateModel, setUpdateModel] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [cookies, setCookie] = useCookies(["medirecords"]);
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const columns = [
    {
      selector: "name",
      name: "Name",
    },
    {
      selector: "_id",
      name: "ID",
      hide: 20000,
    },
    {
      selector: "email",
      name: "Email",
    },
    {
      selector: "phone_number",
      name: "Phone Number",
      hide: 500,
    },
    {
      selector: "age",
      name: "Age",
    },
    {
      selector: "address",
      name: "Address",
      hide: 20000,
    },
    {
      selector: "symptoms",
      name: "Symptoms",
      hide: 20000,
    },
    {
      selector: "notes",
      name: "Notes",
      hide: 20000,
    },
    {
      selector: "first_visit",
      name: "First Visit",
    },
    {
      selector: "last_visit",
      name: "Last Visit",
    },
    {
      cell: (row) => (
        <Button
          color="success"
          onClick={() => {
            setViewData(row);
            setView(true);
            Axios.get(`${API_PREFIX}/customerprescriptions`, {
              params: { phoneNumber: row.phone_number },
            })
              .then((res) => setPrescriptions(res?.data))
              .catch(console.log);
          }}
          id={row.ID}
        >
          View
        </Button>
      ),
      width: "120px",
    },
    {
      cell: (row) => (
        <Button
          color="info"
          onClick={() => {
            setCustomerId(row._id);
            setSymptoms(row.symptoms);
            setNotes(row.notes);
            setUpdateModel(true);
          }}
        >
          Update
        </Button>
      ),
      width: "120px",
    },

    {
      cell: (row) => (
        <Button
          color="danger"
          onClick={() => {
            setDeleteModal(true);
            setCustomerId(row._id);
          }}
        >
          Delete
        </Button>
      ),
      width: "120px",
    },
  ];
  const getCustomersAPI = () => {
    Axios.get(`${API_PREFIX}/allcustomers`, {
      headers: {
        authorization: `Bearer ${cookies.medirecords}`,
      },
    })
      .then((res) => setCustomersData(res.data.Customers))
      .catch(console.log);
  };

  useEffect(() => {
    if(cookies.medirecords==undefined){
      navigate("/login");
  } else{
    getCustomersAPI();
  }
      
   
     
  }, []);

  const updateCustomer = async () => {
    try {
      var today = new Date();
      var date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();
      await Axios.put(`${API_PREFIX}/updatecustomer`, {
        id: customerId,
        symptoms,
        notes,
        lastVisit: date,
      });
      getCustomersAPI();
      dispatch(alertAction(true, "The Customer has been updated", "success"));
      setTimeout(() => dispatch(alertAction(false, "", "")), 3000);
    } catch (err) {
      dispatch(alertAction(true, "The Customer cannot be update", "danger"));
      setTimeout(() => dispatch(alertAction(false, "", "")), 3000);
    }
  };

  const addCustomer = async () => {
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
        email,
        phoneNumber,
        age,
        notes,
        symptoms,
        address,
        firstVisit: date,
        lastVisit: date,
      };

      await Axios.post(`${API_PREFIX}/addcustomer`, objData);
      getCustomersAPI();
      setModal(false);

      dispatch(alertAction(true, "The Customer has been added", "success"));
      setTimeout(() => dispatch(alertAction(false, "", "")), 3000);
    } catch (err) {
      dispatch(alertAction(true, "The Customer cannot be added", "danger"));
      setTimeout(() => dispatch(alertAction(false, "", "")), 3000);
    }
  };

  const deleteCustomer = async () => {
    try {
      let response = await Axios.delete(`${API_PREFIX}/deletecustomer`, {
        data: {
          id: customerId,
        },
      });
      getCustomersAPI();
      dispatch(alertAction(true, "The Customer has been delete", "success"));
      setTimeout(() => dispatch(alertAction(false, "", "")), 3000);
    } catch (err) {
      dispatch(alertAction(true, "The Customer cannot be delete", "danger"));
      setTimeout(() => dispatch(alertAction(false, "", "")), 3000);
    }
  };

  const searchCustomers = async () => {
    try {
      let response = await Axios.get(`${API_PREFIX}/allcustomers`, {
        params: {
          name: name,
        },
        headers: {
          authorization: `Bearer ${cookies.medirecords}`,
        }
      });
      setCustomersData(response?.data.Customers);

      if (name.length == 1) {
        getCustomersAPI();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const debounceOnChange = debounce(searchCustomers, 500);
  return (
    <div className="p-2">
      {/* Add customers Modal  */}

      <Button color="info" onClick={() => setModal(true)} className="mt-4 mb-4">
        Add Customers
      </Button>
      <Input
        placeholder="Search by name"
        className="w-25 mb-2"
        onChange={(e) => {
          debounceOnChange();
          setName(e.target.value);
        }}
      />

      <Modal isOpen={modal}>
        <ModalHeader>Add Customers</ModalHeader>
        <ModalBody>
          <Input
            placeholder=" Name"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="inputGroup mt-2">
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
          </div>

          <div className="inputGroup mt-2">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
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
              placeholder="Notes"
              type="textarea"
              rows={5}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setModal(false);
              addCustomer();
            }}
          >
            Add
          </Button>
          <Button color="secondary" onClick={() => setModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <DataTable
        columns={columns}
        data={customersData}
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
              <CardSubtitle className="text-info">{viewData.name}</CardSubtitle>
              <CardSubtitle className="text-info">
                Age: {viewData.age}
              </CardSubtitle>
              <CardSubtitle className="text-info">
                Phone Number:{viewData.phone_number}
              </CardSubtitle>
              <CardSubtitle className="text-info">
                Email:{viewData.email}
              </CardSubtitle>
              <CardText className="text-primary">{viewData.address}</CardText>

              {prescriptions.map((prescription, index) => {
                return (
                  <>
                    <hr />
                    <CardText>
                      <div className="d-flex justify-content-between">
                        <h6 className="text-success text-bold">
                          Appointment: {index + 1}
                        </h6>
                        <h6 className="text-danger">
                          {prescription.visitDate}
                        </h6>
                      </div>

                      <h6>Symptoms</h6>
                      {prescription.symptoms}
                    </CardText>

                    <CardText>
                      <h6>Medicine</h6>
                      {prescription.medicine}
                    </CardText>

                    <CardText>
                      <h6>Notes</h6>
                      {prescription.notes}
                    </CardText>
                  </>
                );
              })}
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setView(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* Update Model */}
      <Modal isOpen={updateModel}>
        <ModalHeader>{viewData.name} Details</ModalHeader>
        <ModalBody>
          <h6>Symptoms</h6>
          <div className="inputGroup mt-2">
            <Input
              defaultValue={symptoms}
              type="textarea"
              rows={3}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>
          <h6>Notes</h6>
          <div className="inputGroup mt-2">
            <Input
              defaultValue={notes}
              type="textarea"
              rows={5}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              updateCustomer();
              setUpdateModel(false);
            }}
          >
            Update
          </Button>
          <Button color="secondary" onClick={() => setUpdateModel(false)}>
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
              deleteCustomer();
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

export default Customers;
