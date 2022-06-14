import React,{useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap';
  import { BiPlusMedical } from 'react-icons/bi';
  import { useNavigate } from 'react-router-dom';
  import { CUSTOMERS,PRESCRIPTIONS } from '../../Routes';
 
  
 const NavBar=()=> {


    
const[isOpen,setIsOpen]=useState(false);
const navigate = useNavigate();      
    
  
 const toggle=()=> {
   setIsOpen(!isOpen);
  }
 
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <BiPlusMedical size='50px'/>  Medical Clinic</NavbarBrand>
          <NavbarToggler onClick={()=>toggle()} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className='pointerCursor' onClick={()=>navigate(CUSTOMERS)}>Customers</NavLink>
              </NavItem>
              <NavItem>
              <NavLink className='pointerCursor' onClick={()=>navigate(PRESCRIPTIONS)}>Prescriptions</NavLink>
              </NavItem>
             
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  
};
export default NavBar;