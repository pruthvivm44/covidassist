import React from 'react';
import { Modal, Button,Container, Row,Col,Form } from 'react-bootstrap';

class UpdateLead extends React.Component {
    constructor(props){
        super(props);
        this.state={
            verifiedLead:'',
            comment:'',
            stockAvailabilty:''
        }
    }
    onChangeStockAvailability = (e)=>{
        if(e.target.value==='null'){
            this.setState({
                stockAvailabilty:'',
            });
        }else{
            this.setState({
                stockAvailabilty:e.target.value
            });
        }
    }
    onChangeLeadVerified = (e) =>{
        if(e.target.value==='null'){
            this.setState({
                verifiedLead:'',
            });
        }else{
            this.setState({
                verifiedLead:e.target.value
            });
        }
    }
    onCommentChange = (e)=>{
        this.setState({
            comment:e.target.value,
        });
    }
    onSaveChanges = ()=>{
        this.props.updateNow(this.state);
    }
    render(){
        return(
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Now</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="p-2">
                            <Form.Group controlId="isVerified" className="mr-2">
                                <Form.Control
                                    as="select"
                                    custom
                                    onChange={this.onChangeLeadVerified}>
                                            <option value='null'>Lead Verified ?</option>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="stockAvailable">
                            <Form.Control
                                as="select"
                                custom
                                onChange={this.onChangeStockAvailability}>
                                        <option value='null'>Stock Available ?</option>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row className="pl-2 pr-2">
                            <Col md={12} className="p-0">
                                <Form.Group controlId="addressLine1">
                                    <Form.Control as="textarea" value={this.state.comment} rows={3} placeholder="Comments ( Optional )" onChange={this.onCommentChange}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.onSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default UpdateLead;