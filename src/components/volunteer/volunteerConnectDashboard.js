import React from 'react';
import { Container,Row,Col,Jumbotron,Tab,Tabs } from 'react-bootstrap';
import AssignedCases from './assignedCases';
import AllCases from './allCases';

class VolunteerConnectDashboard extends React.Component {
    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <Jumbotron className="pt-4 pb-4">
                            <h1>Hello, {this.props.data.firstName}</h1>
                            <h6>One Person can make the difference and you are the one , Thank you for joining hands to Help others .</h6>
                            {/* <Button variant="danger">Edit Profile</Button> */}
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Tabs defaultActiveKey="Assigned Cases" id="uncontrolled-tab-example">
                            <Tab eventKey="Assigned Cases" title="Assigned Cases" tabClassName="black hoverred">
                                <AssignedCases />
                            </Tab>
                            <Tab eventKey="All Cases" title="All Cases" tabClassName="black hoverred">
                                <AllCases />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default VolunteerConnectDashboard;
