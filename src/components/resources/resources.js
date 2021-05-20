import React from "react";
import { Container,Row,Col } from "react-bootstrap";

class Resources extends React.Component {
    constructor(props){
        super(props);
    }
    render() { 
        return (  
            <Container>
                <Row>
                    <Col md={6} className="p-3">
                        <div className="">
                            <h4>VOLUNTEER LOGIN</h4>
                            <div className="pinkBorder"></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default Resources;