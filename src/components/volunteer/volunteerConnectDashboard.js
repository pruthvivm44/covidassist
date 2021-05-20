import React from 'react';
import { Container,Row,Col,Jumbotron,Tab,Tabs,Button } from 'react-bootstrap';
import AssignedCases from './assignedCases';
import AllCases from './allCases';
import { Link } from 'react-router-dom';

class VolunteerConnectDashboard extends React.Component {
    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <Jumbotron className="pt-4 pb-4">
                            <h3>Hello, {this.props.data.firstName}</h3>
                            <h6>One Person can make the difference and you are the one , Thank you for joining hands to Help others .</h6>
                            <Link to={'/resources'}><Button variant="danger">How to Help patients ?</Button></Link>
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
