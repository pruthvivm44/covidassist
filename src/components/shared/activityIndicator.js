import React from 'react';
import { Row, Container, Col,Spinner,Modal} from 'react-bootstrap'

const ActivityIndicator = (props) => {
    return(
        <Modal show={true} centered  size={'sm'}>
            <Modal.Body className="">
                <Container className="text-center">
                    <Row className="">
                        <Col md={12} className="">
                            <div className="">
                                <Spinner className="loading" animation="grow" variant="danger"/>
                                <h4 className="pt-3 pl-2 pr-2">Hold on...!</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
export default ActivityIndicator