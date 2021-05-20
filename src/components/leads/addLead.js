import React from 'react';
import { Container,Row,Col,Form,Button } from 'react-bootstrap';
import ErrorOrSuccessModal from '../shared/errorOrSuccessModal';
import {StatesAndDistricts}  from '../shared/statesAndDistricts'
import { connect } from 'react-redux';
import { addLeadRequest } from '../../store/actions/leadAction'
import { closeLeadReqModal } from '../../store/actions/leadAction'
import ActivityIndicator from '../shared/activityIndicator';

class AddLead extends React.Component {
    constructor(props){
        super(props);
        this.state={
            serviceSelected:'',
            verifiedLead:'',
            stockAvailabilty:'',
            contactPerson:'',
            priMobNo:'',
            secMobNo:'',
            stateName:'',
            districtArray:[],
            district:'',
            address:'',
            landMark:'',
            city:'',
            pincode:'',
            description:'',
            toShowErrorOrSuccessModal:false,
            type:null,
            businessName:'',
            informationSource:'',
            successOrError:{
                heading:null,
                body:null,
            },
            regexp : /^[0-9\b]+$/,
            stateData:''

        };
    }
    onChangeService = (e)=>{
        if(e.target.value==='null'){
            this.setState({
                serviceSelected:'',
            });
        }else{
            this.setState({
                serviceSelected:e.target.value,
            });
        }
    }
    onChangeLeadVerified = (e) =>{
        if(e.target.value==='null'){
            this.setState({
                verifiedLead:'',
            });
        }else{
            this.setState({
                verifiedLead:e.target.value,
            });
        }
    }
    onChangeStockAvailability = (e)=>{
        if(e.target.value==='null'){
            this.setState({
                stockAvailabilty:'',
            });
        }else{
            this.setState({
                stockAvailabilty:e.target.value,
            });
        }
    }
    contactNameChange = (e)=>{
        this.setState({
            contactPerson:e.target.value
        });
    }
    onPriMobNoChange = (e)=>{
        let telephone = e.target.value;
        if (telephone === '' || this.state.regexp.test(telephone)) {
            this.setState({ priMobNo: telephone });
        }
    }
    onSecMobNoChange = (e)=>{
        let telephone = e.target.value;
        if (telephone === '' || this.state.regexp.test(telephone)) {
            this.setState({ secMobNo: telephone });
        }
    }
    onChangeState = (data)=>{
        if(data.target.value==='null'){
            this.setState({
                stateData:data.target.value,
                stateName:'',
                districtArray:[]
            });
        }else{
            let distArr = data.target.value.split(',');
            let stateName = distArr.shift();
            this.setState({
                stateData:data.target.value,
                stateName:stateName,
                districtArray:distArr,
                district:''
            });
        }
    }
    onChangeDistrict = (event)=>{
        if(event.target.value==='null'){
            this.setState({
                district:'',
            });
        }else{
            this.setState({
                district:event.target.value,
            });
        }
    }
    onLandMarkChange = (e)=>{
        this.setState({
            landMark:e.target.value
        });
    }
    onCityChange = (e)=>{
        this.setState({
            city:e.target.value
        });
    }
    onPincodeChange = (e)=>{
        if(e.target.value.length>6){
            alert('Pincode can only be 6 Digits.');
        }else{
            this.setState({
                pincode:e.target.value
            });
        }
    }
    onAddressChange = (e)=>{
        this.setState({
            address:e.target.value
        });
    }
    onDescriptionChange = (e)=>{
        this.setState({
            description:e.target.value
        });
    }
    toggleErrorOrSuccessModal = ()=>{
        this.setState({
            toShowErrorOrSuccessModal:!this.state.toShowErrorOrSuccessModal,
            type:null,
            successOrError:{
                heading:null,
                body:null,
            },
        });
    }
    businessNameChange = (e)=>{
        this.setState({
            businessName:e.target.value
        });
    }
    onInfoSourceChange = (e)=>{
        this.setState({
            informationSource:e.target.value
        });
    }
    submit = ()=>{
        let state = this.state;
        switch(true){
            case !state.serviceSelected:
            this.setState({
                toShowErrorOrSuccessModal:true,
                type:'error',
                successOrError:{
                    heading:'Required',
                    body:'Select your Lead type .',
                }
            });
            break;

            case !state.verifiedLead:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Select your Lead verified or not .',
                    }
                });
            break;

            case !state.stockAvailabilty:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Select whether the stock available or not .',
                    }
                });
            break;

            
            case !state.contactPerson:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Enter Contact Person Name',
                    }
                });
            break;

            case state.priMobNo.length!==10:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Invalid Primary mobile number.',
                    }
                });
            break;
            case !state.stateName:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Please select your state and district .',
                    }
                });
            break;

            case !state.district:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Please select your district .',
                    }
                });
            break;

            case !state.address:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Please enter Lead address .',
                    }
                });
            break;

            case !state.city:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Please enter your current city .',
                    }
                });
            break;

            case state.pincode==='':
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Please enter Lead pincode .',
                    }
                });
            break;

            case state.pincode.length!==6:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Invalid Pincode .',
                    }
                });
            break;

            default:
                let data = {
                    requestId:null,
                    leadType:this.state.serviceSelected,
                    leadDescription:this.state.description,
                    verifiedStatus:this.state.verifiedLead,
                    isVerified:this.state.verifiedLead==='true' ? true :false,
                    lastVerifiedBy:null,
                    lastVerifiedAt:null,
                    createdAt:null,
                    comments:null,
                    imageUrl:null,
                    businessName:this.state.businessName,
                    businessAddress:{
                        addressLine:this.state.address,
                        landMark:this.state.landMark,
                        city:this.state.city,
                        state:this.state.stateName,
                        district:this.state.district,
                        pin:this.state.pincode
                    },
                    contactPerson:this.state.contactPerson,
                    primaryMobile:this.state.priMobNo,
                    secondaryMobile:this.state.secMobNo,
                    stockAvailable:this.state.stockAvailabilty ==='yes' ? true :false,
                    informationSource:this.state.informationSource,
                };
                console.log(data)
                this.props.addLeadRequest(data)
                break;
        }
    }
    closeSuccessReqModal = () =>{
            this.setState({
                serviceSelected:'',
                verifiedLead:'',
                stockAvailabilty:'',
                contactPerson:'',
                priMobNo:'',
                secMobNo:'',
                stateName:'',
                districtArray:[],
                district:'',
                address:'',
                landMark:'',
                city:'',
                pincode:'',
                description:'',
                toShowErrorOrSuccessModal:false,
                type:null,
                businessName:'',
                informationSource:'',
                stateData:'',
                successOrError:{
                    heading:null,
                    body:null,
                },
            },()=>{
                this.props.closeLeadReqModal();
            });
    }
    render(){
        return(
            <Container fluid className="mt-3 mb-3">
                <Row >
                    <Col md={3}>
                    <Form.Label>Lead type <span className="redColor"> *</span></Form.Label>

                        <Form.Group controlId="changeState">
                            <Form.Control
                                as="select"
                                custom
                                onChange={this.onChangeService}
                                value={this.state.serviceSelected ? this.state.serviceSelected :'null'}>
                                        <option value='null'>Select Lead Type</option>
                                        <option value='General Bed Request'>General Bed Request</option>
                                        <option value='Bed with oxygen'>Bed with oxygen</option>
                                        <option value='ICU Bed + ventilator'>ICU Bed + ventilator</option>
                                        <option value='Ambulance Service'>Ambulance Service</option>
                                        <option value='Plasma Request'>Plasma Request</option>
                                        <option value='Oxygen Concentrator On Rent'>Oxygen Concentrator On Rent</option>
                                        <option value='Medicine'>Medicine</option>
                                        <option value='Nursing Care'>Nursing Care</option>

                                        <option value='Bipap Machine on Rent Service'>Bipap Machine on Rent Service</option>
                                        <option value='Burial / Cremation Service / Hearse Van Service'>Burial / Cremation Service / Hearse Van Service</option>
                                        <option value='Buy Covid Essentials - Pulse Oximeter, Thermometer, Masks'>Buy Covid Essentials - Pulse Oximeter, Thermometer, Masks</option>
                                        <option value='Doctor Tele Medical Consultation Service'>Doctor Tele Medical Consultation Service</option>
                                        <option value='Food Delivery Service - Home Delivery For Covid Affected'>Food Delivery Service - Home Delivery For Covid Affected</option>
                                        <option value='Free Food Delivery For Poor'>Free Food Delivery For Poor</option>
                                        <option value='Personal Counselling and Motivation'>Personal Counselling and Motivation</option>
                                        <option value='Physiotherapist Consultation'>Physiotherapist Consultation</option>
                                        <option value='Vaccination - Guidance And Centers Availability Help'>Vaccination - Guidance And Centers Availability Help</option>

                                        <option value='Other'>Other</option>
                                </Form.Control>
                            </Form.Group>
                    </Col>
                    <Col md={3}>
                    <Form.Label>Lead Verified ? <span className="redColor"> *</span></Form.Label>
                        <Form.Group controlId="isVerified">
                            <Form.Control
                                as="select"
                                custom
                                onChange={this.onChangeLeadVerified}
                                value={this.state.verifiedLead ? this.state.verifiedLead :'null'}>
                                        <option value='null'>Lead Verified ?</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                    <Form.Label>Stock Available ?<span className="redColor"> *</span></Form.Label>
                        <Form.Group controlId="stockAvailable">
                            <Form.Control
                                as="select"
                                custom
                                onChange={this.onChangeStockAvailability}
                                value={this.state.stockAvailabilty ? this.state.stockAvailabilty :'null'}>
                                        <option value='null'>Stock Available ?</option>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                    <Form.Label>Contact Person Name <span className="redColor"> *</span></Form.Label>
                        <Form.Group controlId="contactPerson">
                            <Form.Control type="text" value={this.state.contactPerson} placeholder="Contact Person Name" onChange={this.contactNameChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Form.Label>Primary Mobile<span className="redColor"> *</span></Form.Label>
                        <Form.Group controlId="priMobileNo">
                            <Form.Control value={this.state.priMobNo} type="number" placeholder="Primary Mobile Number" onChange={this.onPriMobNoChange} maxLength={10}/>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Label>Secondary Mobile</Form.Label>
                        <Form.Group controlId="secMobileNo">
                            <Form.Control type="number" value={this.state.secMobNo} placeholder="Secondary Mobile Number" onChange={this.onSecMobNoChange} maxLength={10} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                            <Form.Label>Select State ?<span className="redColor"> *</span></Form.Label>
                            <Form.Group controlId="changeState">
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    custom
                                    onChange={this.onChangeState}
                                    value={this.state.stateData ? this.state.stateData :'null'}>
                                        <option value='null'>Select State</option>
                                        {StatesAndDistricts.map((data,i)=>(
                                            <option key={i} value={[data.state,data.districts]}>{data.state} </option>
                                        ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        {this.state.districtArray.length!==0 ?
                        <Col md={3}>
                            <Form.Label>Select district ?<span className="redColor"> *</span></Form.Label>
                            <Form.Group controlId="changeState">
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    custom
                                    onChange={this.onChangeDistrict}
                                    value={this.state.district ? this.state.district :'null'}>
                                        <option value='null'>Select District</option>
                                        {this.state.districtArray.map((data,i)=>(
                                            <option key={i} value={data}>{data} </option>
                                        ))}
                                </Form.Control>
                            </Form.Group>
                        </Col> 
                        :null}
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Label>Lead Description </Form.Label>
                        <Form.Group controlId="description">
                            <Form.Control as="textarea" value={this.state.description} rows={3} placeholder="Lead description" onChange={this.onDescriptionChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Label>Address <span className="redColor"> *</span></Form.Label>
                        <Form.Group controlId="addressLine1">
                            <Form.Control as="textarea" value={this.state.address} rows={3} placeholder="Address" onChange={this.onAddressChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Landmark<span className="redColor"> *</span></Form.Label>
                        <Form.Group controlId="landMark">
                            <Form.Control type="text" placeholder="Land Mark ( Optional )" onChange={this.onLandMarkChange} />
                         </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Label>Place <span className="redColor"> *</span></Form.Label>
                        <Form.Group controlId="city">
                            <Form.Control value={this.state.city} type="text" placeholder="Place" onChange={this.onCityChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                            <Form.Label>Pincode <span className="redColor"> *</span></Form.Label>
                            <Form.Group controlId="pincode">
                                <Form.Control type="number" value={this.state.pincode} placeholder="Pincode" onChange={this.onPincodeChange} />
                            </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Label>Business Name</Form.Label>
                         <Form.Group controlId="businessName">
                            <Form.Control type="text" value={this.state.businessName} placeholder="Business Name ( Optional )" onChange={this.businessNameChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Label>Information Source</Form.Label>
                        <Form.Group controlId="infoSource">
                            <Form.Control type="text" value={this.state.informationSource} placeholder="Information Source" onChange={this.onInfoSourceChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="danger" type="submit" onClick={this.submit}>
                        Submit
                </Button>
                {this.state.toShowErrorOrSuccessModal ? 
                 <ErrorOrSuccessModal type={this.state.type} open={this.state.toShowErrorOrSuccessModal} heading={this.state.successOrError.heading} body={this.state.successOrError.body} handleClose={this.toggleErrorOrSuccessModal}/>:null}
                {this.props.leadAdded ? 
                 <ErrorOrSuccessModal type={this.props.type} open={this.props.leadAdded} heading={this.props.successOrError.heading} body={this.props.successOrError.body} handleClose={this.closeSuccessReqModal}/>:null}
                {this.props.loading ?
                <ActivityIndicator />:null}
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        auth : state.firebase.auth,
        leadAdded:state.leads.leadAdded,
        type:state.leads.type,
        successOrError:state.leads.successOrError,
        loading:state.leads.loading
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
        addLeadRequest:(creds) => dispatch(addLeadRequest(creds)),
        closeLeadReqModal:() => dispatch(closeLeadReqModal())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddLead);