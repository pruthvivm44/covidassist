import React from 'react';
import {Table,Container,Row,Col, DropdownButton ,Dropdown,ButtonGroup,Button} from 'react-bootstrap';
import { connect } from 'react-redux'
import { getAllCases } from '../../store/actions/volunteerAction'
import { assignRequest } from '../../store/actions/volunteerAction'
import Loading from '../Loading';
import ErrorOrSuccessModal from '../shared/errorOrSuccessModal';
import AllCasesRow from './allCasesRow';
import { makeRequestAssignedFalse } from '../../store/actions/volunteerAction'
import CasesPagination from './casesPagination';
import {StatesAndDistricts}  from '../shared/statesAndDistricts'

class AllCases extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectedState:null,
            selectedDistrict:null,
            selectedService:null,
            districtArray:[],
            filterData:null
        }
    }
    componentDidMount(){
        let data = {
            status:['OPEN','UNASSIGNED'].toString()
        };
        this.setState({
            filterData:data
        },()=>{
            this.props.getAllCases(data);
        });
    }
    onStateChange = (data)=>{
        if(!data[0]){
            let stateData ={
                ...this.state.filterData
            };
            delete stateData.state;
            delete stateData.district;
            this.setState({
                selectedState:null,
                filterData:stateData,
                selectedDistrict:null,
                districtArray:[]
            },()=>{
                this.props.getAllCases(stateData);
            });
        }else{
            let stateData ={
                ...this.state.filterData,
                state:data[0]
            };
            this.setState({
                selectedState:data[0],
                districtArray:data[1] ? data[1]:[],
                selectedDistrict:null,
                filterData:stateData
            },()=>{
                this.props.getAllCases(stateData);
            });
            
        }
    }
    onDistrictChange = (district)=>{
        if(!district){
            let data ={
                ...this.state.filterData
            };
            delete data.district;
            this.setState({
                selectedDistrict:null,
                filterData:data
            },()=>{
                this.props.getAllCases(data);
            });
        }else{
            console.log('i am here')
            let data ={
                ...this.state.filterData,
                district:district
            }
            this.setState({
                selectedDistrict:district,
                filterData:data
            },()=>{
                this.props.getAllCases(data);
            });
        }
    }
    onServiceChange = (service)=>{
        if(!service){
            let data ={
                ...this.state.filterData
            };
            delete data.serviceTypes;
            this.setState({
                selectedService:null,
                filterData:data
            },()=>{
                this.props.getAllCases(data);
            });
        }else{
            this.setState({
                selectedService:service
            },()=>{
                let serviceArr = [];
                serviceArr.push(this.state.selectedService);
                let data = {
                    ...this.state.filterData,
                    page:0,
                    serviceTypes:serviceArr.toString(),
                };
                this.setState({
                    filterData:data
                },()=>{
                    this.props.getAllCases(data);
                });
            });
        }
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
        let data = {
            ...this.state.filterData,
            page:pageNumber
        };
        this.setState({
            filterData:data
        },()=>{
            this.props.getAllCases(data);
        });
    }
    clearFilter = ()=>{
        let stateData ={
            ...this.state.filterData,
            status:['OPEN','UNASSIGNED'].toString()
        };
        delete stateData.state;
        delete stateData.district;
        delete stateData.serviceTypes;
        this.setState({
            selectedState:null,
            filterData:stateData,
            selectedDistrict:null,
            districtArray:[],
            selectedService:null,
        },()=>{
            this.props.getAllCases(stateData);
        });
    }
    render(){
        if(this.props.allCases){
            if(this.props.allCases.content.length===0){
                return(
                    <>
                    <Container fluid>
                        <Row className="mt-3 mb-3">
                                <DropdownButton
                                    as={ButtonGroup}
                                    key={"1"}
                                    id={'service'}
                                    variant={'danger'}
                                    title={this.state.selectedService ? this.state.selectedService :'Service Type - All'}
                                    className="mr-2 dropbtn">
                                        <Dropdown.Item eventKey="1" onClick={()=>{this.onServiceChange(null)}}>Clear Filter</Dropdown.Item>
                                        <Dropdown.Item eventKey="2" onClick={()=>{this.onServiceChange('General Bed Request')}}>General Bed Request</Dropdown.Item>
                                        <Dropdown.Item eventKey="3" onClick={()=>{this.onServiceChange('Bed with oxygen')}}>Bed with oxygen</Dropdown.Item>
                                        <Dropdown.Item eventKey="4" onClick={()=>{this.onServiceChange('ICU Bed + ventilator')}}>ICU Bed + ventilator</Dropdown.Item>
                                        <Dropdown.Item eventKey="5" onClick={()=>{this.onServiceChange('Ambulance Service')}}>Ambulance Service</Dropdown.Item>
                                        <Dropdown.Item eventKey="6" onClick={()=>{this.onServiceChange('Plasma Request')}}>Plasma Request</Dropdown.Item>
                                        <Dropdown.Item eventKey="7" onClick={()=>{this.onServiceChange('Oxygen Concentrator On Rent')}}>Oxygen Concentrator On Rent</Dropdown.Item>
                                        <Dropdown.Item eventKey="8" onClick={()=>{this.onServiceChange('Medicine')}}>Medicine</Dropdown.Item>
                                        <Dropdown.Item eventKey="9" onClick={()=>{this.onServiceChange('Nursing Care')}}>Nursing Care</Dropdown.Item>
                                
                                    <Dropdown.Item eventKey="10" onClick={()=>{this.onServiceChange('Bipap Machine on Rent Service')}}>Bipap Machine on Rent Service</Dropdown.Item>
                                    <Dropdown.Item eventKey="11" onClick={()=>{this.onServiceChange('Burial / Cremation Service / Hearse Van Service')}}>Burial / Cremation Service / Hearse Van Service</Dropdown.Item>
                                    <Dropdown.Item eventKey="12" onClick={()=>{this.onServiceChange('Buy Covid Essentials - Pulse Oximeter, Thermometer, Masks')}}>Buy Covid Essentials - Pulse Oximeter, Thermometer, Masks</Dropdown.Item>
                                    <Dropdown.Item eventKey="13" onClick={()=>{this.onServiceChange('Doctor Tele Medical Consultation Service')}}>Doctor Tele Medical Consultation Service</Dropdown.Item>
                                    <Dropdown.Item eventKey="14" onClick={()=>{this.onServiceChange('Food Delivery Service - Home Delivery For Covid Affected')}}>Food Delivery Service - Home Delivery For Covid Affected</Dropdown.Item>
                                    <Dropdown.Item eventKey="15" onClick={()=>{this.onServiceChange('Free Food Delivery For Poor')}}>Free Food Delivery For Poor</Dropdown.Item>
                                    <Dropdown.Item eventKey="16" onClick={()=>{this.onServiceChange('Personal Counselling and Motivation')}}>Personal Counselling and Motivation</Dropdown.Item>
                                    <Dropdown.Item eventKey="17" onClick={()=>{this.onServiceChange('Physiotherapist Consultation')}}>Physiotherapist Consultation</Dropdown.Item>
                                    <Dropdown.Item eventKey="18" onClick={()=>{this.onServiceChange('Vaccination - Guidance And Centers Availability Help')}}>Vaccination - Guidance And Centers Availability Help</Dropdown.Item>
                                    <Dropdown.Item eventKey="18" onClick={()=>{this.onServiceChange('Other')}}>Other</Dropdown.Item>
                                </DropdownButton>
                                <DropdownButton
                                    as={ButtonGroup}
                                    key={"2"}
                                    id={'state'}
                                    variant={'danger'}
                                    title={this.state.selectedState ? this.state.selectedState :'State - All'}
                                    className="mr-2 dropbtn">  
                                    <Dropdown.Item eventKey="2" onClick={()=>{this.onStateChange([null,null])}}>Clear Filter</Dropdown.Item>
                                    {StatesAndDistricts.map((data,i)=>(
                                        <Dropdown.Item eventKey={i} key={i} onClick={()=>{this.onStateChange([data.state,data.districts])}}>{data.state}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            {this.state.districtArray.length!==0 ?
                                <DropdownButton
                                    as={ButtonGroup}
                                    key={"3"}
                                    id={'district'}
                                    variant={'danger'}
                                    title={this.state.selectedDistrict ? this.state.selectedDistrict : 'District - All'}
                                    className="mr-2 dropbtn">
                                    <Dropdown.Item eventKey="1" onClick={()=>{this.onDistrictChange(null)}}>Clear Filter</Dropdown.Item>
                                    {this.state.districtArray.map((data,i)=>(
                                        <Dropdown.Item eventKey={i} key={i} onClick={()=>{this.onDistrictChange(data)}}>{data}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                                :null}
                            <Button variant={'secondary'} className="dropbtn" onClick={this.clearFilter}>Clear all Filters</Button>

                        </Row>
                    </Container>
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
                    <Container fluid>
                        <Row className="mt-3 mb-3">
                                <DropdownButton
                                    as={ButtonGroup}
                                    key={"1"}
                                    id={'service'}
                                    variant={'danger'}
                                    title={this.state.selectedService ? this.state.selectedService :'Service Type - All'}
                                    className="mr-2 dropbtn">
                                        <Dropdown.Item eventKey="1" onClick={()=>{this.onServiceChange(null)}}>Clear Filter</Dropdown.Item>
                                        <Dropdown.Item eventKey="2" onClick={()=>{this.onServiceChange('General Bed Request')}}>General Bed Request</Dropdown.Item>
                                        <Dropdown.Item eventKey="3" onClick={()=>{this.onServiceChange('Bed with oxygen')}}>Bed with oxygen</Dropdown.Item>
                                        <Dropdown.Item eventKey="4" onClick={()=>{this.onServiceChange('ICU Bed + ventilator')}}>ICU Bed + ventilator</Dropdown.Item>
                                        <Dropdown.Item eventKey="5" onClick={()=>{this.onServiceChange('Ambulance Service')}}>Ambulance Service</Dropdown.Item>
                                        <Dropdown.Item eventKey="6" onClick={()=>{this.onServiceChange('Plasma Request')}}>Plasma Request</Dropdown.Item>
                                        <Dropdown.Item eventKey="7" onClick={()=>{this.onServiceChange('Oxygen Concentrator On Rent')}}>Oxygen Concentrator On Rent</Dropdown.Item>
                                        <Dropdown.Item eventKey="8" onClick={()=>{this.onServiceChange('Medicine')}}>Medicine</Dropdown.Item>
                                        <Dropdown.Item eventKey="9" onClick={()=>{this.onServiceChange('Nursing Care')}}>Nursing Care</Dropdown.Item>
                                        <Dropdown.Item eventKey="10" onClick={()=>{this.onServiceChange('Bipap Machine on Rent Service')}}>Bipap Machine on Rent Service</Dropdown.Item>
                                    <Dropdown.Item eventKey="11" onClick={()=>{this.onServiceChange('Burial / Cremation Service / Hearse Van Service')}}>Burial / Cremation Service / Hearse Van Service</Dropdown.Item>
                                    <Dropdown.Item eventKey="12" onClick={()=>{this.onServiceChange('Buy Covid Essentials - Pulse Oximeter, Thermometer, Masks')}}>Buy Covid Essentials - Pulse Oximeter, Thermometer, Masks</Dropdown.Item>
                                    <Dropdown.Item eventKey="13" onClick={()=>{this.onServiceChange('Doctor Tele Medical Consultation Service')}}>Doctor Tele Medical Consultation Service</Dropdown.Item>
                                    <Dropdown.Item eventKey="14" onClick={()=>{this.onServiceChange('Food Delivery Service - Home Delivery For Covid Affected')}}>Food Delivery Service - Home Delivery For Covid Affected</Dropdown.Item>
                                    <Dropdown.Item eventKey="15" onClick={()=>{this.onServiceChange('Free Food Delivery For Poor')}}>Free Food Delivery For Poor</Dropdown.Item>
                                    <Dropdown.Item eventKey="16" onClick={()=>{this.onServiceChange('Personal Counselling and Motivation')}}>Personal Counselling and Motivation</Dropdown.Item>
                                    <Dropdown.Item eventKey="17" onClick={()=>{this.onServiceChange('Physiotherapist Consultation')}}>Physiotherapist Consultation</Dropdown.Item>
                                    <Dropdown.Item eventKey="18" onClick={()=>{this.onServiceChange('Vaccination - Guidance And Centers Availability Help')}}>Vaccination - Guidance And Centers Availability Help</Dropdown.Item>
                                    <Dropdown.Item eventKey="18" onClick={()=>{this.onServiceChange('Other')}}>Other</Dropdown.Item>
                                
                                </DropdownButton>
                                <DropdownButton
                                    as={ButtonGroup}
                                    key={"2"}
                                    id={'state'}
                                    variant={'danger'}
                                    title={this.state.selectedState ? this.state.selectedState :'State - All'}
                                    className="mr-2 dropbtn">  
                                    <Dropdown.Item eventKey="2" onClick={()=>{this.onStateChange([null,null])}}>Clear Filter</Dropdown.Item>
                                    {StatesAndDistricts.map((data,i)=>(
                                        <Dropdown.Item eventKey={i} key={i} onClick={()=>{this.onStateChange([data.state,data.districts])}}>{data.state}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            {this.state.districtArray.length!==0 ?
                                <DropdownButton
                                    as={ButtonGroup}
                                    key={"3"}
                                    id={'district'}
                                    variant={'danger'}
                                    title={this.state.selectedDistrict ? this.state.selectedDistrict : 'District - All'}
                                    className="mr-2 dropbtn">
                                    <Dropdown.Item eventKey="1" onClick={()=>{this.onDistrictChange(null)}}>Clear Filter</Dropdown.Item>
                                    {this.state.districtArray.map((data,i)=>(
                                        <Dropdown.Item eventKey={i} key={i} onClick={()=>{this.onDistrictChange(data)}}>{data}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                                :null}
                            <Button variant={'secondary'} onClick={this.clearFilter} className="dropbtn">Clear all Filters</Button>

                        </Row>
                    </Container>
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
                                    return(
                                        <AllCasesRow data={data}  key={i} index={i+1} assignNow={this.assignNow} />
                                    )
                            })}
                        </tbody>
                    </Table>                              
                    {this.props.requestAssigned ?
                        <ErrorOrSuccessModal type={'success'} open={this.props.requestAssigned} heading={'Request Assigned'} body={'Thank you for Assigning the request .'} handleClose={this.closeSuccessReqModal}/>
                    :null}
                    {this.props.errorAssigningRequest ?
                        <ErrorOrSuccessModal type={'error'} open={this.props.errorAssigningRequest} heading={'Alert'} body={'Request assigned by some other volunteer try assigning other .'} handleClose={this.closeSuccessReqModal}/>
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
        allCasesPagination:state.volunteer.allCasesPagination,
        errorAssigningRequest:state.volunteer.errorAssigningRequest
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