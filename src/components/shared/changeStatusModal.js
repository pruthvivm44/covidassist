import React from 'react';
import { Modal, Button,Container, Row,Col,Form } from 'react-bootstrap';

class ChangeStatusModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            comment:'',
        }
    }
    render(){
        return(
        <Modal show={this.props.show} onHide={this.props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{fontSize:14}}>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="pl-2 pr-2">
                        <Col md={12} className="p-0">
                            <Form.Group controlId="addressLine1">
                                <Form.Control as="textarea" value={this.state.comment} rows={3} placeholder="Comments ( Optional )" onChange={(e)=>{this.setState({comment:e.target.value})}}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>this.props.confirm(this.state.comment)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
}
export default ChangeStatusModal;