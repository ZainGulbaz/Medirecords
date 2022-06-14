import {useState,useEffect} from "react";
import {FaFileMedicalAlt} from "react-icons/fa";
import Axios from "axios";
import { API_PREFIX } from "../../Constants";
import { Button,FormGroup, Label, Input} from 'reactstrap';
import { useDispatch } from "react-redux";
import { alertAction } from "../../Redux/Actions/AlertAction";
import { useNavigate } from "react-router-dom";
import {CUSTOMERS} from "../../Routes";
import { useCookies } from "react-cookie";
const Login=()=>{

    
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[cookies,setCookie]=useCookies(["medirecords"]);
  const dispatch =useDispatch();
  let navigate= useNavigate();
  
  const login=()=>{
      Axios.post(`${API_PREFIX}/login`,{email,password}).then((res)=>{
          if(res.data.response)
          {
           navigate(CUSTOMERS);
           setCookie("medirecords",res.data.response,{maxAge:3600});
          }
      }).catch((err)=>{
          dispatch(alertAction(true,"You have entered wrong password or email","danger"));
          setTimeout(()=>dispatch(alertAction(false,"","")),3000);
        });
  }
    return(
        <>
    <div className="loginContainer row">

    <div className="loginBox1 col-5">
        <FaFileMedicalAlt size={100}/>
        <h3>MEDI RECORDS</h3>
        <h6 className="mt-4 introPara">An application that provides a perfect</h6>
        <h6 className="introPara">solution to medical records</h6>
    </div>
    <div className="loginBox2 col-7">
        <h4>Login</h4>
        <FormGroup className="loginInput mt-4">
        <Label  className="textBold">Email</Label>
          <Input type="email" name="email"  placeholder="john@gmail.com" onChange={(e)=>setEmail(e.target.value)}/>
          </FormGroup>
          <FormGroup className="loginInput mt-4">
        <Label className="textBold">Password</Label>
          <Input type="password" name="password"  placeholder="**********" onChange={(e)=>setPassword(e.target.value)}/>
          </FormGroup>
          <Button color="success" className="loginButton" onClick={()=>login()}>Login</Button>
    </div>

    </div>
        </>
    )


};

export default Login;