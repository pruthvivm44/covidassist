import React from 'react'
import {Button,Modal} from 'react-bootstrap'
import {faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ErrorOrSuccessModal extends React.Component {
    render(){
        return(
            <Modal show={this.props.open} onHide={this.props.handleClose} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{this.props.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div id="mdbody" className="text-center">
                    <FontAwesomeIcon id="verified" icon={faCheckCircle} color={'green'} size={'lg'}/>
                    <h6 className="pt-3">{this.props.body} edfsdf</h6>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="danger" onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default ErrorOrSuccessModal;