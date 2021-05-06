import React from 'react';
import {Table,Container,Row,Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { getAllCases } from '../../store/actions/volunteerAction'
import Loading from '../Loading';
import AllCasesRow from './allCasesRow';

class AllCases extends React.Component {
    componentDidMount(){
        this.props.getAllCases();
    }
    render(){
        console.log(this.props.allCases);
        if(this.props.allCases){
            if(this.props.allCases.content.length===0){
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
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient Name</th>
                                <th>District</th>
                                <th>State</th>
                                <th >Sevice Required</th>
                                <th className="text-center">Updated at</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Assign</th>
                            </tr>                
                        </thead>
                        <tbody>
                            {this.props.allCases.content.map((data,i) =>(
                                <AllCasesRow data={data} key={i}/>
                            ))}
                        </tbody>
                    </Table>                              
        
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
        allCases : state.volunteer.cases.allCases
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
        getAllCases:() => dispatch(getAllCases()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllCases);