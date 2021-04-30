import React from 'react';
import { Row, Container, Col,Button,Form} from 'react-bootstrap'

class PatientForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            admittedToHospital:'false'
        }
    }
    onAdmittedToHospitalChange = (event) =>{
        this.setState({
            admittedToHospital:event.target.value
        });
    }
    render(){
        console.log(this.state.admittedToHospital)
        return(
            <Container>
            <Form>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="ptName">
                            <Form.Label>Patient Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Patient Name" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="srfId">
                            <Form.Label>SRF_ID</Form.Label>
                            <Form.Control type="text" placeholder="SRF_ID ( Optional )" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="buNumber">
                            <Form.Label>BU Number</Form.Label>
                            <Form.Control type="text" placeholder="BU Number (Optional)" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label> Covid Test Result</Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="covResult"
                                custom>
                                <option value="0">Choose...</option>
                                <option value="1">+ ve</option>
                                <option value="2">- ve</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                        <Form.Label> Vaccination Taken ?</Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="vaccTaken"
                                custom>
                                <option value="0">Choose...</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="ptAge">
                            <Form.Label>Patient Age</Form.Label>
                            <Form.Control type="number" placeholder="age" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Patient Gender</Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="patGender"
                                custom>
                                <option value="0">Choose...</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="2">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="ctName">
                            <Form.Label>Care Taker Name</Form.Label>
                            <Form.Control type="text" placeholder="Care Taker Name" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Care Taker Gender</Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="careTakerGender"
                                custom>
                                <option value="0">Choose...</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="2">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="priMobileNo">
                            <Form.Label>Primary Mobile Number</Form.Label>
                            <Form.Control type="text" placeholder="Primary Mobile Number" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="secMobileNo">
                            <Form.Label>Secondary Mobile Number</Form.Label>
                            <Form.Control type="text" placeholder="Secondary Mobile Number" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="relWithPat">
                            <Form.Label>Relationship with patient</Form.Label>
                            <Form.Control type="text" placeholder="Relationship with patient ( Optional )" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="admitToHos">
                            <Form.Label >Admitted to Hospital</Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                custom
                                onChange={this.onAdmittedToHospitalChange}>
                                <option value="0">Choose...</option>
                                <option value={'true'}>Yes</option>
                                <option value={'false'}>No</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    {this.state.admittedToHospital === 'true' ?  
                    <>
                     <Col md={4}>
                        <Form.Group controlId="hospName">
                            <Form.Label>Hospital Name</Form.Label>
                            <Form.Control type="text" placeholder="Hospital Name" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="hospAddr">
                            <Form.Label>Hospital Address</Form.Label>
                            <Form.Control type="text" placeholder="Hospital Address" />
                        </Form.Group>
                    </Col>
                    </>:null}
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group controlId="addressLine1">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control type="text" placeholder="Address Line 1" multiple={true}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group controlId="addressLine2">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control type="text" placeholder="Address Line 2 ( Optional )" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="landMark">
                            <Form.Label>Land Mark</Form.Label>
                            <Form.Control type="text" placeholder="Land Mark ( Optional )" />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="danger" type="submit">
                    Submit
                </Button>
                </Form>
                </Container>
        )
    }
}
export default PatientForm;