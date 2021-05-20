import React from "react";
import { Col, Container, Row } from "react-bootstrap";

class Disclaimer extends React.Component {
    state = {  }
    render() { 
        return (  
            <Container>
                <Row>
                    <Col md={6} className="p-3">
                        <div className="">
                            <h4>Disclaimer</h4>
                            <div className="pinkBorder"></div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            <li>
                                We have not added any of the resources on this site, and We don't keep up the data given by them. On the off chance that you discover incorrect data in the assets, kindly contact the resource owner .
                            </li>
                            <li>
                                This site is intended for info purposes just, and is definitely not a substitute for clinical determination and treatment. Please consult doctor's for Medications using our resources.
                            </li>
                            <li>
                                You are using the COVID ASSIST INDIA website solely at your own risk, and We are not liable for any loss you may incur as a result of it.
                            </li>
                            <li>
                                Situations are changing in a fast forwarded frequency so the information in this site may go out dated please verify before you proceed with the things .
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default Disclaimer;