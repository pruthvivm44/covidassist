import React from 'react';
import { Container,Row,Col,DropdownButton,Dropdown,ButtonGroup } from 'react-bootstrap';
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
        console.log(status)
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
                                className="mr-2">
                                    <Dropdown.Item eventKey="1" onClick={()=>{this.onServiceChange(null)}}>Clear Filter</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={()=>{this.onServiceChange('General Bed Request')}}>General Bed Request</Dropdown.Item>
                                    <Dropdown.Item eventKey="3" onClick={()=>{this.onServiceChange('Bed with oxygen')}}>Bed with oxygen</Dropdown.Item>
                                    <Dropdown.Item eventKey="4" onClick={()=>{this.onServiceChange('ICU Bed + ventilator')}}>ICU Bed + ventilator</Dropdown.Item>
                                    <Dropdown.Item eventKey="5" onClick={()=>{this.onServiceChange('Ambulance Service')}}>Ambulance Service</Dropdown.Item>
                                    <Dropdown.Item eventKey="6" onClick={()=>{this.onServiceChange('Plasma Request')}}>Plasma Request</Dropdown.Item>
                                    <Dropdown.Item eventKey="7" onClick={()=>{this.onServiceChange('Oxygen Concentrator On Rent')}}>Oxygen Concentrator On Rent</Dropdown.Item>
                                    <Dropdown.Item eventKey="8" onClick={()=>{this.onServiceChange('Medicine')}}>Medicine</Dropdown.Item>
                                    <Dropdown.Item eventKey="9" onClick={()=>{this.onServiceChange('Nursing Care')}}>Nursing Care</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton
                                as={ButtonGroup}
                                key={"1"}
                                id={'state'}
                                variant={'danger'}
                                title={this.state.selectedState ? this.state.selectedState :'State - All'}
                                className="mr-2">  
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
                                className="mr-2">
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
                                className="mr-2">
                                <Dropdown.Item eventKey="1" onClick={()=>{this.onLeadStatusChange(null)}}>Clear Filter</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={()=>{this.onLeadStatusChange('VERIFIED')}}>Verified</Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={()=>{this.onLeadStatusChange('NOT VERIFIED')}}>Not Verified</Dropdown.Item>
                            </DropdownButton>
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
                    <Container fluid>
                    <Row className="mt-3 mb-3">
                            <DropdownButton
                                as={ButtonGroup}
                                key={"0"}
                                id={'service'}
                                variant={'danger'}
                                title={this.state.leadTypes ? this.state.leadTypes :'Lead Type - All'}
                                className="mr-2">
                                    <Dropdown.Item eventKey="1" onClick={()=>{this.onServiceChange(null)}}>Clear Filter</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={()=>{this.onServiceChange('General Bed Request')}}>General Bed Request</Dropdown.Item>
                                    <Dropdown.Item eventKey="3" onClick={()=>{this.onServiceChange('Bed with oxygen')}}>Bed with oxygen</Dropdown.Item>
                                    <Dropdown.Item eventKey="4" onClick={()=>{this.onServiceChange('ICU Bed + ventilator')}}>ICU Bed + ventilator</Dropdown.Item>
                                    <Dropdown.Item eventKey="5" onClick={()=>{this.onServiceChange('Ambulance Service')}}>Ambulance Service</Dropdown.Item>
                                    <Dropdown.Item eventKey="6" onClick={()=>{this.onServiceChange('Plasma Request')}}>Plasma Request</Dropdown.Item>
                                    <Dropdown.Item eventKey="7" onClick={()=>{this.onServiceChange('Oxygen Concentrator On Rent')}}>Oxygen Concentrator On Rent</Dropdown.Item>
                                    <Dropdown.Item eventKey="8" onClick={()=>{this.onServiceChange('Medicine')}}>Medicine</Dropdown.Item>
                                    <Dropdown.Item eventKey="9" onClick={()=>{this.onServiceChange('Nursing Care')}}>Nursing Care</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton
                                as={ButtonGroup}
                                key={"1"}
                                id={'state'}
                                variant={'danger'}
                                title={this.state.selectedState ? this.state.selectedState :'State - All'}
                                className="mr-2">  
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
                                className="mr-2">
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
                                className="mr-2">
                                <Dropdown.Item eventKey="1" onClick={()=>{this.onLeadStatusChange(null)}}>Clear Filter</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={()=>{this.onLeadStatusChange('true')}}>Verified</Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={()=>{this.onLeadStatusChange('false')}}>Not Verified</Dropdown.Item>
                            </DropdownButton>
                    </Row>
                    {this.props.allLeads.content.map((data,i) =>{
                        return(
                            <SingleLead data={data}  key={i} index={i+1} />
                        )
                    })}
                     <div className="text-center d-flex justify-content-center">
                        <CasesPagination data={this.props.allLeadsPagination} navigateToPage={this.navigateToPage}/>
                    </div>
                </Container>
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