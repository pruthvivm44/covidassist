import React from 'react';
import { Row, Container, Col} from 'react-bootstrap'

class Footer extends React.Component {
    render(){
        return(
            <div className="footerBack mt-3">
                 <Container>
                        <Row className="d-flex align-items-center p-2">
                            <Col md={6} className="text-center text-md-left whitetext ">
                                <h6 className="mb-0 whiteColor">@CovidAssistIndia 2021</h6>
                            </Col>
                            <Col md={6} className="text-center text-md-right mt-1 mb-1">
                                <h6 className="mb-0 whiteColor">Contact-us : covidassistindia@gmail.com</h6>
                            </Col>
                        </Row>
                    </Container>
            </div>
         )
    }
}
export default Footer;
