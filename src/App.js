import './App.css';
import NavBar from "./Components/Navbar/NavBar";
import Customers from './Components/Views/Customers';
import Prescription from './Components/Views/Prescriptions';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import {Routes,Route,useLocation} from "react-router-dom";
import Prescriptions from './Components/Views/Prescriptions';
import {PRESCRIPTIONS,CUSTOMERS,LOGIN} from "./Routes";
import Login from './Components/Login/Login';
function App() {

  const alert=useSelector((store)=>store?.alertReducer);
  const location=useLocation();


  return (
   <>
  {(alert.isAlert)&&<Alert color={alert?.color}>{alert?.message}</Alert>}
   {(location.pathname!==LOGIN)&&<NavBar/>}  
   <Routes>
   <Route exact path={PRESCRIPTIONS} element={<Prescriptions/>}/>
   <Route exact path={CUSTOMERS} element={<Customers/>}/>
   <Route exact path={LOGIN} element={<Login/>}/>
   </Routes>
   </>
  );
}

export default App;
