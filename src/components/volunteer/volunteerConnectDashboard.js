import React from 'react';
import { Container,Row,Col,Jumbotron,Button,Tab,Tabs,Table } from 'react-bootstrap';

class VolunteerConnectDashboard extends React.Component {
    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <Jumbotron className="pt-4 pb-4">
                            <h1>Hello, {this.props.data.firstName}</h1>
                            <h6>One Person can make the difference and you are the one , Thank you for joining hands to Help others .</h6>
                            <Button variant="danger">Edit Profile</Button>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Tabs defaultActiveKey="Assigned Cases" id="uncontrolled-tab-example">
                            <Tab eventKey="Assigned Cases" title="Assigned Cases" tabClassName="black hoverred">
                                <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Patient Name</th>
                                    <th>Mobile Number</th>
                                    <th>Care Taker Name</th>
                                    <th>District</th>
                                    <th>State</th>
                                    <th >Sevice Required</th>
                                    <th>View</th>
                                    <th>Un-assign</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Prathap</td>
                                        <td>9741920643</td>
                                        <td>Somesh</td>
                                        <td>Tumkur</td>
                                        <td>Karnataka</td>
                                        <td>Oxygen Bed</td>
                                        <td><a href="# ">view</a></td>
                                        <td><Button variant="danger">un-Assign</Button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Prathap</td>
                                        <td>9741920643</td>
                                        <td>Somesh</td>
                                        <td>Tumkur</td>
                                        <td>Karnataka</td>
                                        <td>Oxygen Bed</td>
                                        <td><a href="# ">view</a></td>
                                        <td><Button variant="danger">un-Assign</Button></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Prathap</td>
                                        <td>9741920643</td>
                                        <td>Somesh</td>
                                        <td>Tumkur</td>
                                        <td>Karnataka</td>
                                        <td>Oxygen Bed</td>
                                        <td><a href="# ">view</a></td>
                                        <td><Button variant="danger">un-Assign</Button></td>

                                    </tr>
                                </tbody>
                                </Table>
                            </Tab>
                            <Tab eventKey="profile" title="Active cases" tabClassName="black hoverred">
                                <h1>hekko</h1>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default VolunteerConnectDashboard;