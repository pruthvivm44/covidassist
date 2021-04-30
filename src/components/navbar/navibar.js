import React from 'react';
import logo from '../../images/logo.jpg'
// import '../../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar,Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

const Navibar = (props) => {
        return(
            <Navbar collapseOnSelect bg="white" expand="md" variant="light" className="p-4">
                <Navbar.Brand className="p-0" ><NavLink to={'/'}><img src={logo} alt="Logo" width="210px;" /></NavLink></Navbar.Brand>
                <Navbar.Toggle color="#000"  aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav.Link className="black hoverred" href="#deets">HOME</Nav.Link>
                    <Nav.Link className="black hoverred" href="#deets">VOLUNTEER</Nav.Link>
                    <Nav.Link className="black hoverred" href="#deets">PLASMA DONAR</Nav.Link>
                    <Nav.Link className="black hoverred" href="#deets">RESOURCES</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        )

  }
  export default Navibar;
