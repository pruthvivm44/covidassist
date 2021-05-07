import React from 'react';
import {Button,Container,Form,Row,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import {faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AssignedCasesRow extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            toShowView:false,
            toShowStatus:false
        };
    }
    viewRequestStatus = () =>{
        this.setState({
            toShowStatus:!this.state.toShowStatus
        });
    }
    render(){
        return(
            <>
            <tr>    
                <td>1</td>
                <td>{this.props.data.patientDetails.name}</td>
                <td>{this.props.data.careTakerDetails.primaryMobile}</td>
                <td>{this.props.data.careTakerDetails.name}</td> 
                {this.props.data.careTakerDetails.secondaryMobile ? 
                <td>{this.props.data.careTakerDetails.secondaryMobile}</td>
                :
                <td>NA</td>
                }
                <td>{this.props.data.serviceRequested}</td>
                <td>{this.props.data.address.district}</td>
                <td className="text-center">
                    <Button variant="outline-info" onClick={()=>{this.setState({toShowView:!this.state.toShowView})}}>
                        View

                    {(this.state.toShowView) ?
                    <FontAwesomeIcon id="verified" icon={faCaretDown} color={'#82C7D2'} size={'sm'} className="ml-1 mr-1 "/>
                    :
                    <FontAwesomeIcon id="verified" icon={faCaretRight} color={'#82C7D2'} size={'sm'} className="ml-1 mr-1 "/>
                    }
                    </Button>
                </td>
                <td  className="text-center"><Button variant="danger">unAssign</Button></td>
            </tr>
            
                {this.state.toShowView ? 
                <tr>
                    <td colSpan={12}><Container>
                        <Row>
                            <Col >
                                <p><strong>SRF_IF : </strong>{this.props.data.srfId ? this.props.data.srfId : 'NA'}</p>
                            </Col>
                            <Col >
                                <p><strong>BU No : </strong>{this.props.data.buNumber ? this.props.data.buNumber : 'NA'}</p>
                            </Col>
                            <Col >
                                <p><strong>Covid test result : </strong>{this.props.data.covidTestResult}</p>
                            </Col>
                            <Col >
                                <p><strong>Vaccination Taken : </strong>{this.props.data.isVaccinationTaken}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <p><strong>Patient Age : </strong>{this.props.data.patientDetails.age}</p>
                            </Col>
                            <Col >
                                <p><strong>Patient Gender : </strong>{this.props.data.patientDetails.gender}</p>
                            </Col>
                            <Col >
                                <p><strong>Care taker Relationship: </strong>{this.props.data.careTakerDetails.relationWithPatient ? this.props.data.careTakerDetails.relationWithPatient : 'NA'}</p>
                            </Col>
                            <Col>
                                <p><strong>Admitted to Hospital : </strong>{this.props.data.hospitalDetails.isAdmittedToHospital ? 'Yes' : 'No'}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <p><strong>Hospital Name : </strong>{this.props.data.hospitalDetails.hospitalName ? this.props.data.hospitalDetails.hospitalName : 'NA' }</p>
                            </Col>
                            <Col >
                                <p><strong>Hospital Address : </strong>{this.props.data.hospitalDetails.hospitalAddress ? this.props.data.hospitalDetails.hospitalAddress : 'NA' }</p>
                            </Col>
                            <Col >
                                <p><strong>City: </strong>{this.props.data.address.city}</p>
                            </Col>
                            <Col>
                                <p><strong>Pincode : </strong>{this.props.data.address.pin}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <p><strong>Address : </strong>{this.props.data.address.addressLine}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <p><strong>State : </strong>{this.props.data.address.state}</p>
                            </Col>
                            <Col >
                                {this.props.data.patientDetails.symptoms.length>0 ? 
                                    <p><strong>Symptoms : </strong>
                                        {this.props.data.patientDetails.symptoms.map( data =>(
                                            data
                                        ))}
                                    </p>
                                    :
                                    <p><strong>Symptoms : </strong>NA</p>
                                }
                            </Col>
                            <Col >
                                {this.props.data.patientDetails.comorbidities.length>0 ? 
                                    <p><strong>Suffering with : </strong>
                                        {this.props.data.patientDetails.comorbidities.map( data =>(
                                            data
                                        ))}
                                    </p>
                                    :
                                    <p><strong>Suffering with : </strong>NA</p>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                {this.props.data.description.length>0 ? 
                                    <p><strong>Description : </strong>
                                        {this.props.data.description.map( data =>(
                                            data
                                        ))}
                                    </p>
                                    :
                                    <p><strong>Description : </strong>NA</p>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form>
                                    <Form.Group controlId="comments">
                                        <Form.Control as="textarea" rows={3} placeholder="Any Comments ( Optional )" onChange={this.onDescriptionChange} />
                                    </Form.Group>
                                    <Button variant="danger" type="submit" onClick={this.submit}>
                                        Add Comment
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="pt-3 pb-3">
                                <Button variant="danger" type="submit" onClick={this.viewRequestStatus}>
                                    View Request Status
                                </Button>
                            </Col>
                        </Row>
                        {this.state.toShowStatus ? 
                        <Row>
                        <Col >
                            {this.props.data.requestStatus.length>0 ? 
                                <p><strong>Request Status : </strong>
                                    {this.props.data.requestStatus.map( data =>(
                                        data.status+'->'
                                    ))}
                                </p>
                                :
                                <p><strong>Request Status : </strong>NA</p>
                            }
                        </Col>
                        </Row>:null}
                    </Container>
                    </td>
                </tr>
                :null}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth : state.firebase.auth,
        loading:state.volunteer.loading
    }
}

export default connect(mapStateToProps,null)(AssignedCasesRow);