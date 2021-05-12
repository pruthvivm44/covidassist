import React from 'react';
import {Table,Container,Row,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { getCasesByVolunteerId } from '../../store/actions/volunteerAction'
import { unAssignRequest } from '../../store/actions/volunteerAction'
import { makeRequestAssignedFalse } from '../../store/actions/volunteerAction'
import { addCommentToPatientReq } from '../../store/actions/volunteerAction'
import Loading from '../Loading';
import ErrorOrSuccessModal from '../shared/errorOrSuccessModal';
import AssignedCasesRow from './assignedCasesRow';

class AssignedCases extends React.Component {
    componentDidMount(){
        this.props.getCasesByVolunteerId(this.props.auth.uid);
    }
    unAssignNow = (requestId)=>{
        let data = {
            requestId:requestId,
            volunteerId:this.props.auth.uid
        };
        this.props.unAssignRequest(data);
    }
    addComment = (comment,data)=>{
        let cmtArr = [];
        let commentData = {
            comment:comment,
            volunteerId:this.props.auth.uid,
        };
        if(data.comments){
            data.comments.push(commentData);
            cmtArr = data.comments;
        }else{
            cmtArr.push(commentData);
        }
        let dataToSend = {
            requestId:data.requestId,
            comments:cmtArr
        };
        this.props.addCommentToPatientReq(dataToSend);
    }
    render(){
        if(this.props.assignedCases){
            if(this.props.assignedCases.content.length===0){
                return(
                    <Container>
                        <Row className="p-5">
                            <Col md={12} className="text-center">
                                <h3>No Data present</h3>
                            </Col>
                        </Row>
                        {this.props.requestUnAssigned ?
                        <ErrorOrSuccessModal type={'success'} open={this.props.requestUnAssigned} heading={'Request unAssigned'} body={'Your request has been unAssigned .'} handleClose={this.props.makeRequestAssignedFalse}/>
                    :null}
                    </Container>
                )
            }else{
                return(
                    <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient Name</th>
                                <th>Primary Phone</th>
                                <th>Caretaker</th>
                                <th>Secondary Phone</th>
                                <th >Sevice Required</th>
                                <th >District</th>
                                <th className="text-center">View</th>
                                <th className="text-center">Action</th>
                            </tr>                
                        </thead>
                        <tbody>
                            {this.props.assignedCases.content.map((data,i) =>{
                                // if(data.currentStatus==='Open'){
                                    return(
                                        <AssignedCasesRow data={data}  key={i} addComment={this.addComment} unAssignNow={this.unAssignNow} index={i} />
                                    )
                                // }
                            })}
                        </tbody>
                    </Table>                              
                    {this.props.requestUnAssigned ?
                        <ErrorOrSuccessModal type={'success'} open={this.props.requestUnAssigned} heading={'Request unAssigned'} body={'Your request has been unAssigned .'} handleClose={this.props.makeRequestAssignedFalse}/>
                    :null}
                    </>
                )
            }
        }else{
            return(
                <Container>
                    <Row className="p-5">
                        <Col md={12}>
                            <Loading />
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth,
        assignedCases:state.volunteer.cases.assignedCases,
        loading:state.volunteer.loading,
        requestUnAssigned:state.volunteer.requestUnAssigned,
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
        getCasesByVolunteerId:(creds) => dispatch(getCasesByVolunteerId(creds)),
        unAssignRequest:(creds) => dispatch(unAssignRequest(creds)),
        makeRequestAssignedFalse:() => dispatch(makeRequestAssignedFalse()),
        addCommentToPatientReq:(creds)=>dispatch(addCommentToPatientReq(creds))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AssignedCases);
        