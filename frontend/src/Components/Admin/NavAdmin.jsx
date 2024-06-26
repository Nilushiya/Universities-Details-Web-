import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap';
import brand from '../Assets/Brand.png'
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../../Context/UserContext';
const NavAdmin = () => {
    const[userId , setUserId] = useState('');
    const[name , setName] = useState('');
    const navigate = useNavigate();
    const handleNavigate = () => {
      navigate(`/`);
    };
    const logout = () => {
        localStorage.removeItem('token');
        handleNavigate()
      }
      useEffect(() => {
        const decode = decodeToken();
        if(decode){
         const user = decode.studentId;
         const userName = decode.name;
         setName(userName)
         setUserId(user);
        //  console.log('name' , name);
        }
        else{
         const user = null;
         const userName = null
         setName(userName)
         setUserId(user);
        }
      },[])
  return (
    <div className="NavAdmin">
        <BootstrapNavbar expand="lg" id="navbar">
            <BootstrapNavbar.Brand href="#" className="brandIcon">
            <FontAwesomeIcon icon={faGraduationCap} color="#7FC7D9"  size='2x' style={{marginLeft:"20px"}} />
            </BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: '#7FC7D9' }} />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto adminRight">
                    <Nav.Link className="logoutBtn" href="#" onClick={logout}>
                        Logout
                    </Nav.Link>
                    <Nav.Link className="navicon" href="/adminprofile">
                        <FontAwesomeIcon icon={faUser} color="#7FC7D9"  size='2x' />
                    </Nav.Link>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
     </div>
);
}
export default NavAdmin