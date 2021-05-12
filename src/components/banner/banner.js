import React from 'react';
import { Row, Container, Col,Card} from 'react-bootstrap'
import Footer from '../footer';
import Helped from './helped';
import PatientForm from './patientForm';

const Banner = (props) => {
        return(
            <>
            <Container fluid>
                <Row>
                    <Col md={12} className="text-center ">
                        <h1 className="pt-3">Let's Contribute together in Breaking the chain</h1>
                        <h4 className="pt-3 red">Need of Bed, Oxygen, Plasma or any ?</h4>
                        <h6 className="pt-1">We are here to help you..!</h6>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="patientRequestText text-center">Patient Request</Card.Title>
                                <PatientForm />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Helped />
               
            </Container>
             <Footer />
             </>
        )

  }
  export default Banner;
