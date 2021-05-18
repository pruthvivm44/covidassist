import React from 'react';
import logo from '../../images/logo.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authAction'

class Navibar extends React.Component {
    scrollToMyRef = () =>{
        // Get the navbar
        var navbar = document.getElementById("patient");
        var offsetTop =  navbar.offsetTop;
                window.scrollTo({
                    top:offsetTop, 
                    behavior:'smooth'})  ;
    } 
    // run this method to execute scrolling. 
    render(){
        return(
            <Navbar collapseOnSelect bg="white" expand="md" variant="light" className="p-4">
                <Navbar.Brand className="p-0" ><NavLink to={'/'}><img src={logo} alt="Logo" width="210px;" /></NavLink></Navbar.Brand>
                <Navbar.Toggle color="#000"  aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav.Link className="black hoverred" onClick={this.scrollToMyRef}>
                        PATIENT</Nav.Link>
                    {this.props.auth.uid ?
                    <NavDropdown title="ACCOUNT" id="basic-nav-dropdown" className="black hoverred">
                        <NavDropdown.Item href="# " to={'/volunteer'} as={Link}>Dashboard</NavDropdown.Item>
                        <NavDropdown.Item href="# " onClick={()=>{this.props.signOut()}}>Sign out</NavDropdown.Item>
                    </NavDropdown>
                    :
                    <Nav.Link className="black hoverred" to={'/volunteer'} as={Link}>VOLUNTEER</Nav.Link>
                    }
                    <Nav.Link className="black hoverred" to={'/leads'} as={Link}>LEADS</Nav.Link>
                   
                </Navbar.Collapse>
            </Navbar>
        )
    }
  

  }
  const mapStateToProps = (state) => {
    return{
        auth : state.firebase.auth
    }
  }
  const mapDispatchToProps = (dispatch) =>{
    return {
        signOut:(creds) => dispatch(signOut(creds)),
    }
}
  export default connect(mapStateToProps,mapDispatchToProps)(Navibar);
