import React from 'react';
import { Row, Container, Col,Card, Image, Button} from 'react-bootstrap'
import Footer from '../footer';
import Helped from './helped';
import PatientForm from './patientForm';
import banner from '../../images/banner.svg'

class Banner extends React.Component {
    scrollToMyRef = () =>{
        // Get the navbar
        var navbar = document.getElementById("patient");
        var offsetTop =  navbar.offsetTop;
                window.scrollTo({
                    top:offsetTop, 
                    behavior:'smooth'})  ;
    } 
    render(){
        return(
            <div>
            <Container fluid >
                <Row>
                    <Col md={12} className="text-center ">
                        <h1 className="pt-3">Let's Contribute together in Breaking the chain</h1>
                        <h4 className="pt-3 red">Need of Bed, Oxygen, Plasma or any ?</h4>
                        <h6 className="pt-1">We are here to help you..!</h6>
                        
                        <Button variant="outline-danger" className="mt-2" onClick={this.scrollToMyRef}>Patient Request</Button>{' '}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Image src={banner} width="100%" className="p-4" fluid/>
                    </Col>
                </Row>
                <Row className="mt-3" id="patient" >
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="patientRequestText text-center">Patient Request</Card.Title>
                                <PatientForm ref={this.myRef}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Helped />
               
            </Container>
             <Footer />
             </div>
        )
    }
      

  }
  export default Banner;
