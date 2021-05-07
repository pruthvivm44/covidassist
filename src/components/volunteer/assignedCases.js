import React from 'react';
import {Table,Container,Row,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { getCasesByVolunteerId } from '../../store/actions/volunteerAction'
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
        this.props.assignRequest(data);
    }
    render(){
        console.log('Assigned Cases :',this.props.assignedCases)
        if(this.props.assignedCases){
            if(this.props.assignedCases.content.length===0){
                return(
                    <Container>
                        <Row className="p-5">
                            <Col md={12} className="text-center">
                                <h3>No Data present</h3>
                            </Col>
                        </Row>
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
                                        <AssignedCasesRow data={data}  key={i} unAssignNow={this.unAssignNow} index={i} />
                                    )
                                // }
                            })}
                        </tbody>
                    </Table>                              
                    {this.props.requestAssigned ?
                        <ErrorOrSuccessModal type={'success'} open={this.props.requestAssigned} heading={'Request unAssigned'} body={'Thank you for Assigning the request .'} handleClose={this.closeSuccessReqModal}/>
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
        auth : state.firebase.auth,
        assignedCases : state.volunteer.cases.assignedCases,
        loading:state.volunteer.loading
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
        getCasesByVolunteerId:(creds) => dispatch(getCasesByVolunteerId(creds)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AssignedCases);
        