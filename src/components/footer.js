import React from 'react';
import { Row, Container, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render(){
        return(
            <div className="footerBack mt-3">
                 <Container>
                        <Row className="d-flex align-items-center p-2">
                            <Col md={4} className="text-center text-md-left whitetext ">
                                <h6 className="mb-0 whiteColor">@CovidAssistIndia 2021</h6>
                            </Col>
                            <Col md={4} className="text-center text-md-center mt-1 mb-1">
                                <Link to={'/disclaimer'} ><h6 className="mb-0 whiteColor">Disclaimer</h6></Link>
                            </Col>
                            <Col md={4} className="text-center text-md-right mt-1 mb-1">
                                <h6 className="mb-0 whiteColor">Contact-us : covidassistindia@gmail.com</h6>
                            </Col>
                        </Row>
                    </Container>
            </div>
         )
    }
}
export default Footer;
