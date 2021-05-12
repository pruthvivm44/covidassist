import React from 'react';
import {Button,Container,Form,Row,Col,Spinner } from 'react-bootstrap';
import { connect } from 'react-redux'
import {faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AssignedCasesRow extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            toShowView:false,
            toShowStatus:false,
            comment:''
        };
    }
    viewRequestStatus = () =>{
        this.setState({
            toShowStatus:!this.state.toShowStatus
        });
    }
    unAssignRequest = ()=>{
        this.setState({
            loading:true
        },()=>{
         this.props.unAssignNow(this.props.data.requestId);
        })
    }
    addComment = ()=>{
        this.setState({
            comment:''
        });
        this.props.addComment(this.state.comment,this.props.data);
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
                <td  className="text-center"><Button variant="danger"  disabled={this.state.loading  && this.props.loading} onClick={this.unAssignRequest} >unAssign
                {(this.state.loading && this.props.loading) ?
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="ml-1 mr-1 "
                        />:null}
                </Button></td>
            </tr>
            
                {this.state.toShowView ? 
                <tr>
                    <td colSpan={12}><Container fluid>
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
                                     {this.props.data.patientDetails.symptoms.toString()} 
                                    </p>
                                    :
                                    <p><strong>Symptoms : </strong>NA</p>
                                }
                            </Col>
                            <Col >
                                {this.props.data.patientDetails.comorbidities.length>0 ? 
                                    <p><strong>Suffering with : </strong>
                                      {this.props.data.patientDetails.comorbidities.toString()}
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
                            <Col md={12} className="pb-2">
                                <p style={{color:'blue'}} className="mb-2" type="submit" onClick={this.viewRequestStatus}>
                                    View Request Status
                                </p>
                                {this.state.toShowStatus ? 
                                <>
                                        {this.props.data.requestStatus.length>0 ? 
                                            <p><strong>Request Status : </strong>
                                                {this.props.data.requestStatus.map( data =>(
                                                    data.status+'->'
                                                ))}
                                            </p>
                                            :
                                            <p><strong>Request Status : </strong>NA</p>
                                        }
                                </>:null}
                            </Col>
                        </Row>
                        {this.props.data.comments?
                        <>
                        {this.props.data.comments.length>0 ? 
                        <Row>
                            <Col>
                                    <p><strong>Comments : </strong></p>
                                    <ul>
                                        {this.props.data.comments.map( (data,i) =>(
                                            <li key={i}>{data.comment}</li>
                                        ))}

                                    </ul>

                            </Col>
                        </Row>:null}
                        </>:null}
                        <Row>
                            <Col md={12}>
                                <Form>
                                    <Form.Group controlId="comments">
                                        <Form.Control as="textarea" value={this.state.comment} rows={3} placeholder="Any Comments ( Optional )" onChange={(e)=>{this.setState({comment:e.target.value})}} />
                                    </Form.Group>
                                    <Button variant="danger" onClick={this.addComment}>
                                        Add Comment
                                    </Button>
                                </Form>
                            </Col>
                        </Row> 
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