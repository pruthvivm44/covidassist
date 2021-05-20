import React from 'react';
import { Container,Row,Col,DropdownButton,Dropdown,ButtonGroup, Button,Table } from 'react-bootstrap';
import {StatesAndDistricts}  from '../shared/statesAndDistricts'
import { connect } from 'react-redux';
import { getAllLeads } from '../../store/actions/leadAction'
import Loading from '../Loading';
import SingleLead from './singleLead';
import CasesPagination from '../volunteer/casesPagination';

class AllLeads extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectedState:null,
            selectedDistrict:null,
            leadTypes:null,
            districtArray:[],
            filterData:null,
            toUpdate:false
        };
    }
    componentDidMount(){
        let data = {
            status:['true','false'].toString()
        };
        this.setState({
            filterData:data
        },()=>{
            this.props.getAllLeads(data);
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
                this.props.getAllLeads(data);
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
                this.props.getAllLeads(stateData);
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
                this.props.getAllLeads(data);
            });
        }else{
            let data ={
                ...this.state.filterData,
                district:district
            }
            this.setState({
                selectedDistrict:district,
                filterData:data
            },()=>{
                this.props.getAllLeads(data);
            });
        }
    }
    onServiceChange = (service)=>{
        if(!service){
            let data ={
                ...this.state.filterData
            };
            delete data.leadTypes;
            this.setState({
                leadTypes:null,
                filterData:data
            },()=>{
                this.props.getAllLeads(data);
            });
        }else{
            this.setState({
                leadTypes:service
            },()=>{
                let serviceArr = [];
                serviceArr.push(this.state.leadTypes);
                let data = {
                    ...this.state.filterData,
                    page:0,
                    leadTypes:serviceArr.toString(),
                };
                this.setState({
                    filterData:data
                },()=>{
                    this.props.getAllLeads(data);
                });
            });
        }
    }
    navigateToPage = (pageNumber)=>{
        let data = {
            ...this.state.filterData,
            page:pageNumber
        };
        this.setState({
            filterData:data
        },()=>{
            this.props.getAllLeads(data);
        });
    }
    onLeadStatusChange = (status)=>{
        if(!status){
            let data ={
                ...this.state.filterData,
                status:['true','false'].toString()
            };
            this.setState({
                filterData:data,
                leadStatus:'Lead Status - All'
            },()=>{
                this.props.getAllLeads(data);
            });
        }else{
            let data ={
                ...this.state.filterData,
                status:[status].toString()
            };
            this.setState({
                filterData:data,
                leadStatus:status ==='true' ? 'Verified' : 'Not Verified'
            },()=>{
                this.props.getAllLeads(data);
            });
        }
    }
    clearFilter = ()=>{
        let stateData ={
            ...this.state.filterData,
            status:['true','false'].toString()
        };
        delete stateData.state;
        delete stateData.district;
        delete stateData.leadTypes;
        this.setState({
            selectedState:null,
            filterData:stateData,
            selectedDistrict:null,
            districtArray:[],
            leadTypes:null,
        },()=>{
            this.props.getAllLeads(stateData);
        });
    }
    render(){
        if(this.props.allLeads){
            if(this.props.allLeads.content.length===0){
                return(
                    <Container fluid>
                        <Row className="mt-3 mb-3">
                            <DropdownButton
                                as={ButtonGroup}
                                key={"0"}
                                id={'service'}
                                variant={'danger'}
                                title={this.state.leadTypes ? this.state.leadTypes :'Lead Type - All'}
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
                                key={"1"}
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
                                key={"2"}
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
                            <DropdownButton
                                as={ButtonGroup}
                                key={"3"}
                                id={'district'}
                                variant={'danger'}
                                title={this.state.leadStatus ? this.state.leadStatus : 'Lead Status - All'}
                                className="mr-2 dropbtn">
                                <Dropdown.Item eventKey="1" onClick={()=>{this.onLeadStatusChange(null)}}>Clear Filter</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={()=>{this.onLeadStatusChange('VERIFIED')}}>Verified</Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={()=>{this.onLeadStatusChange('NOT VERIFIED')}}>Not Verified</Dropdown.Item>
                            </DropdownButton>
                            <Button variant={'secondary'} onClick={this.clearFilter}>Clear all Filters</Button>
                        </Row>
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
                    <Container fluid>
                    <Row className="mt-3 mb-3">
                            <DropdownButton
                                as={ButtonGroup}
                                key={"0"}
                                id={'service'}
                                variant={'danger'}
                                title={this.state.leadTypes ? this.state.leadTypes :'Lead Type - All'}
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
                                key={"1"}
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
                                key={"2"}
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
                            <DropdownButton
                                as={ButtonGroup}
                                key={"3"}
                                id={'district'}
                                variant={'danger'}
                                title={this.state.leadStatus ? this.state.leadStatus : 'Lead Status - All'}
                                className="mr-2 dropbtn">
                                <Dropdown.Item eventKey="1" onClick={()=>{this.onLeadStatusChange(null)}}>Clear Filter</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={()=>{this.onLeadStatusChange('true')}}>Verified</Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={()=>{this.onLeadStatusChange('false')}}>Not Verified</Dropdown.Item>
                            </DropdownButton>
                            <Button variant={'secondary'} className="dropbtn" onClick={this.clearFilter}>Clear Filters</Button>

                    </Row>
                    </Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Service Type</th>
                                <th >Verified Status</th>
                                <th >Last Updated</th>
                                <th>Stock available</th>
                                <th>Contact Name</th>
                                <th>Primary Mobile</th>
                                <th>State</th>
                                <th>District</th>
                                <th className="text-center">View</th>
                                <th className="text-center">Action</th>
                            </tr>                
                        </thead>
                        <tbody>
                    {this.props.allLeads.content.map((data,i) =>{
                        return(
                            <SingleLead data={data}  key={i} index={i+1} />
                        )
                    })}
                    </tbody>
                    </Table>
                     <div className="text-center d-flex justify-content-center">
                        <CasesPagination data={this.props.allLeadsPagination} navigateToPage={this.navigateToPage}/>
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
        allLeads:state.leads.allLeads,
        loading:state.leads.loading,
        allLeadsPagination:state.leads.allLeadsPagination
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
        getAllLeads:(creds) => dispatch(getAllLeads(creds)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllLeads);