import React from 'react';
import {faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import {Row,Col,Card,Button,Spinner } from 'react-bootstrap';
import UpdateLead from '../leads/updateLead'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { updateLead } from '../../store/actions/leadAction'

class SingleLead extends React.Component {
    constructor(props){
        super(props);
        this.state={
            toUpdate:false
        };
    }
    update = () =>{
        this.setState({
            toUpdate:!this.state.toUpdate
        });
    }
    updateNow = (data) =>{
        this.setState({
            toUpdate:!this.state.toUpdate
        },()=>{
            let updateObj = {...this.props.data};
            if(data.verifiedLead){
                updateObj = {
                    ...updateObj,
                    verifiedStatus:data.verifiedLead,
                    isVerified:data.verifiedLead==='true' ? true :false
                };
            }
            if(data.stockAvailabilty){
                updateObj = {
                    ...updateObj,
                    stockAvailable:data.stockAvailabilty==='yes' ? true : false
                };
            }
            if(data.comment){
                let commentData = {};
                if(updateObj.comments){
                    commentData ={
                        comment:data.comment,
                        volunteerId:this.props.auth.uid,
                    }
                    updateObj.comments.push(commentData);
                }else{
                    commentData ={
                        comment:data.comment,
                        volunteerId:this.props.auth.uid,
                    }
                    updateObj = {
                        ...updateObj,
                        comments:[commentData]
                    };
                }
            }
            this.props.updateLead(updateObj);
        });
    }
    render(){
        let date = new Date(this.props.data.createdAt);
        return(
            <>
                    <Row className="mt-2 mb-2">
                        <Col md={12} className="p-0">
                            <Card  className="p-3">
                                <Row className="mb-1">
                                    <Col md={12}>
                                        {this.props.data.isVerified ?
                                            <h5>{this.props.data.leadType} <FontAwesomeIcon className="ml-2 mr-2" id="verified" icon={faCheckCircle} color={'green'} size={'sm'}/><span style={{fontSize:16}}>Verified - [ {date.toDateString()} {date.toLocaleTimeString('en-US')} ]</span></h5>
                                            :
                                            <h5>{this.props.data.leadType} <FontAwesomeIcon className="ml-2 mr-2" id="verified" icon={faExclamationCircle} color={'#efdc2d'} size={'sm'}/><span style={{fontSize:16}}>Verification Pending - [ {date.toDateString()} {date.toLocaleTimeString('en-US')} ]</span></h5>
                                        }
                                    </Col>
                                </Row>
                                <Row >
                                    <Col md={3}>
                                        <p><strong>Contact Name : </strong>{this.props.data.contactPerson}</p>
                                    </Col>
                                    <Col md={3}>
                                        <p><strong>Primary Mobile : </strong>{this.props.data.primaryMobile}</p>
                                    </Col>
                                    <Col md={3}>
                                        <p><strong>Secondary Mobile : </strong>{this.props.data.secondaryMobile ? this.props.data.secondaryMobile : 'N/A'}</p>
                                    </Col>
                                    <Col md={3}>
                                        <p><strong>Stock available : </strong>{this.props.data.stockAvailable ? 'Yes' : 'No'}</p>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col md={6}>
                                        <p><strong>Address : </strong>{this.props.data.businessAddress.addressLine}, {this.props.data.businessAddress.city}, {this.props.data.businessAddress.district}, {this.props.data.businessAddress.state}, {this.props.data.businessAddress.landMark}, {this.props.data.businessAddress.pin}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p><strong>Description : </strong>{this.props.data.leadDescription ? this.props.data.leadDescription : 'N/A'}</p>
                                    </Col>
                                </Row>
        
                                <Row >
                                    <Col md={3}>
                                        <p><strong>Business Name : </strong>{this.props.data.businessName ? this.props.data.businessName : 'N/A'}</p>
                                    </Col>
                                    <Col md={3}>
                                        <p><strong>Information Source : </strong>{this.props.data.informationSource ? this.props.data.informationSource : 'N/A'}</p>
                                    </Col>
                                    <Col md={3}>
                                        <p><strong>Last updated : </strong>{date.toDateString()} {date.toLocaleTimeString('en-US')}</p>
                                    </Col>
                                    {this.props.auth.uid ?
                                    <Col md={3}>
                                        <Button variant="warning" onClick={this.update} disabled={this.props.updateLoading}>Update
                                        {(this.props.updateLoading) ?
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="ml-1 mr-1 "
                                            />:null}
                                            </Button>  
                                    </Col>
                                    :null}
                                    
                                </Row>
                                    {this.props.data.comments?
                                    <>
                                    <p style={{color:'blue'}} type="submit"  onClick={()=>{this.setState({viewComments:!this.state.viewComments})}} variant={'outline-info'}>View Comments</p>
                                        {this.state.viewComments ? 
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
                                        </Row>
                                        :
                                        null
                                        }
                                    </>
                                    :
                                    null
                                    }
                                </>:null}
                            </Card>
                        </Col>
                    </Row>
                    {this.state.toUpdate ? 
                   <UpdateLead show={this.state.toUpdate} handleClose={this.update} leadStatus={"VERIFIED"} updateNow={this.updateNow} />:null}
                </>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth,
        updateLoading:state.leads.updateLoading
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
        updateLead:(creds) => dispatch(updateLead(creds)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SingleLead);