import React from 'react';
import {Table,Container,Row,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { getAllCases } from '../../store/actions/volunteerAction'
import { assignRequest } from '../../store/actions/volunteerAction'
import Loading from '../Loading';
import ErrorOrSuccessModal from '../shared/errorOrSuccessModal';
import AllCasesRow from './allCasesRow';
import { makeRequestAssignedFalse } from '../../store/actions/volunteerAction'
import CasesPagination from './casesPagination';

class AllCases extends React.Component {
    componentDidMount(){
        let data = {
            pageNumber:0
        };
        this.props.getAllCases(data);
    }
    assignNow = (requestId)=>{
        let data = {
            requestId:requestId,
            volunteerId:this.props.auth.uid
        };
        this.props.assignRequest(data);
    }
    closeSuccessReqModal = () =>{
        this.props.makeRequestAssignedFalse();
    }
    navigateToPage = (pageNumber)=>{
        console.log(pageNumber)
        let data = {
            pageNumber:pageNumber
        };
        this.props.getAllCases(data);
    }
    render(){
        if(this.props.allCases){
            if(this.props.allCases.content.length===0){
                return(
                    <>
                    <Container>
                        <Row className="p-5">
                            <Col md={12} className="text-center">
                                <h3>No Data present</h3>
                            </Col>
                        </Row>
                    </Container>
                    {this.props.requestAssigned ?
                        <ErrorOrSuccessModal type={'success'} open={this.props.requestAssigned} heading={'Request Assigned'} body={'Thank you for Assigning the request .'} handleClose={this.closeSuccessReqModal}/>
                    :null}
                    </>
                )
            }else{
                return(
                    <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient Name</th>
                                <th >Sevice Required</th>
                                <th>District</th>
                                <th>State</th>
                                <th className="text-center">Updated at</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Assign</th>
                            </tr>                
                        </thead>
                        <tbody>
                            {this.props.allCases.content.map((data,i) =>{
                                if(data.currentStatus==='OPEN' || data.currentStatus==='UNASSIGNED'){
                                    return(
                                        <AllCasesRow data={data}  key={i} assignNow={this.assignNow} />
                                    )
                                }else{
                                    return (null)
                                }
                            })}
                        </tbody>
                    </Table>                              
                    {this.props.requestAssigned ?
                        <ErrorOrSuccessModal type={'success'} open={this.props.requestAssigned} heading={'Request Assigned'} body={'Thank you for Assigning the request .'} handleClose={this.closeSuccessReqModal}/>
                    :null}
                    <div className="text-center d-flex justify-content-center">
                        <CasesPagination data={this.props.allCasesPagination} navigateToPage={this.navigateToPage}/>
                    </div>
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
        auth : state.firebase.auth,
        allCases : state.volunteer.cases.allCases,
        requestAssigned : state.volunteer.requestAssigned,
        loading:state.volunteer.loading,
        allCasesPagination:state.volunteer.allCasesPagination
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
        getAllCases:(data) => dispatch(getAllCases(data)),
        assignRequest:(creds) => dispatch(assignRequest(creds)),
        makeRequestAssignedFalse:() => dispatch(makeRequestAssignedFalse()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllCases);