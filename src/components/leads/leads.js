import React from 'react';
import { Container,Row,Col,Tab,Tabs } from 'react-bootstrap';
import AddLead from './addLead';
import AllLeads from './allLeads';

class Leads extends React.Component {
    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md={12} className="pt-2 pb-4">
                        <h2>ADD, VIEW OR VERIFY LEAD </h2>
                        <div className="pinkBorder"></div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Tabs defaultActiveKey="allLeads" id="uncontrolled-tab-example">
                            <Tab eventKey="allLeads" title="Leads" tabClassName="black hoverred">
                                <AllLeads />
                            </Tab>
                            <Tab eventKey="addALead" title="Add Lead" tabClassName="black hoverred">
                                <AddLead />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Leads;