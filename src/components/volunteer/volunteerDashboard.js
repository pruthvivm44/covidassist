import React from 'react';
import { connect } from 'react-redux'
import { Row, Container, Col,Card,Form,Button} from 'react-bootstrap'
import { getVolunteerById } from '../../store/actions/volunteerAction.js'
import { registerVolunteer } from '../../store/actions/volunteerAction.js'
import {StatesAndDistricts}  from '../shared/statesAndDistricts'
import ErrorOrSuccessModal from '../shared/errorOrSuccessModal';
import VolunteerConnectDashboard from './volunteerConnectDashboard.js';
import Loading from '../Loading.js';

class VolunteerDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            firstName:null,
            lastName:null,
            priMobNo:localStorage.getItem('volunteerPh'),
            altMobNo:'',
            email:null,
            age:null,
            idProofNo:'',
            address:null,
            landMark:null,
            city:null,
            pincode:'',
            stateName:null,
            districtArray:[],
            district:null,
            toShowErrorOrSuccessModal:false,
            type:null,
            successOrError:{
                heading:null,
                body:null,
            },
            regexp : /^[0-9\b]+$/,
        }
    }
    componentDidMount(){
        console.log(localStorage.getItem('volunteerPh'))
        this.props.getVolunteerById(this.props.auth.uid);
    }
    onFirstNameChange = (e)=>{
        this.setState({
            firstName:e.target.value
        });
    }
    onLastNameChange = (e)=>{
        this.setState({
            lastName:e.target.value
        });
    }
    onAltMobChange = (e)=>{
        let telephone = e.target.value;
        if (telephone === '' || this.state.regexp.test(telephone)) {
            this.setState({ altMobNo: telephone });
        }
    }
    onChangeEmail = (e)=>{
        this.setState({
            email:e.target.value
        });
    }
    onAgeChange = (e)=>{
        if(e.target.value<=0){
            alert('Enter a valid Age');
        }else{
            this.setState({
                age:e.target.value
            });
        }
    }
    onIdProofNoChange = (e)=>{
        this.setState({
            idProofNo:e.target.value
        });
    }
    onAddrChange = (e)=>{
        this.setState({
            address:e.target.value
        });
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
        this.setState({
            pincode:e.target.value
        });
    }
    onChangeState = (data)=>{
        if(data.target.value==='null'){
            this.setState({
                stateName:null,
                districtArray:[]
            });
        }else{
            let distArr = data.target.value.split(',');
            let stateName = distArr.shift();
            this.setState({
                stateName:stateName,
                districtArray:distArr,
                district:null
            });
        }
    }
    onChangeDistrict = (event)=>{
        if(event.target.value==='null'){
            this.setState({
                district:null,
            });
        }else{
            this.setState({
                district:event.target.value,
            });
        }
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
    submit=(e)=>{
        e.preventDefault();
        let state = this.state;
        switch(true){
            case !state.firstName:
            this.setState({
                toShowErrorOrSuccessModal:true,
                type:'error',
                successOrError:{
                    heading:'Required',
                    body:'First Name is Required .',
                }
            });
            break;

            case !state.lastName:
            this.setState({
                toShowErrorOrSuccessModal:true,
                type:'error',
                successOrError:{
                    heading:'Required',
                    body:'Last Name is Required .',
                }
            });
            break;

            case !state.email:
            this.setState({
                toShowErrorOrSuccessModal:true,
                type:'error',
                successOrError:{
                    heading:'Required',
                    body:'Email is Required .',
                }
            });
            break;

            case !state.age:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Age is Required .',
                    }
                });
            break;

            case !state.address:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Address is Required .',
                    }
                });
            break;

            case !state.city:
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'City is Required .',
                    }
                });
            break;

            case state.pincode==='':
                this.setState({
                    toShowErrorOrSuccessModal:true,
                    type:'error',
                    successOrError:{
                        heading:'Required',
                        body:'Pincode is Required .',
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

            default: 
            let data = {
                volunteerId:this.props.auth.uid,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email,
                primaryMobile:this.state.priMobNo,
                alternateMobile:this.state.altMobNo,
                age:this.state.age,
                address:{
                    addressLine:this.state.address,
                    landMark:this.state.landMark,
                    city:this.state.city,
                    state:this.state.stateName,
                    district:this.state.district,
                    pin:this.state.pincode
                },
                idProofNumber:this.state.idProofNo
            }
            this.props.registerVolunteer(data)
            break;
        }
    }
    render(){
        if(this.props.volunteerRequested){
            if(this.props.volunteerData){
                return(
                    <VolunteerConnectDashboard data={this.props.volunteerData} />
                )
            }else{
                return(
                    <Container>
                        <Row className="mb-4">
                            <Col md={12}>
                                <h4>VOLUNTEER DASHBOARD</h4>
                                <div className="pinkBorder"></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                            
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Form className="p-3" onSubmit={this.submit}>
                                        <Row className="pt-2 pb-4">
                                            <Col md={12}>
                                                <h5>Volunteer details</h5>
                                                <div className="pinkBorder"></div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="firstName">
                                                    <Form.Control type="text" placeholder="First Name" onChange={this.onFirstNameChange} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="lastName">
                                                    <Form.Control type="text" placeholder="Last Name" onChange={this.onLastNameChange}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="priMobileNo">
                                                    <Form.Control value={this.state.priMobNo} type="text" disabled={true} placeholder="Primary Mobile Number" onChange={this.onPriMobNoChange} maxLength={10}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="altMobileNo">
                                                    <Form.Control value={this.state.altMobNo} type="number" placeholder="Alternate Mobile Number" onChange={this.onAltMobChange} maxLength={10}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <Form.Group >
                                                    <Form.Control  id="email123"  onChange={this.onChangeEmail} type="email" placeholder="Enter email" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="age">
                                                    <Form.Control type="number" placeholder="Age" onChange={this.onAgeChange}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="idProofNo">
                                                    <Form.Control type="text" placeholder=" Any Id Proof No ( Optional )" onChange={this.onIdProofNoChange}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <Form.Group controlId="addressLine1">
                                                    <Form.Control as="textarea" rows={3} placeholder="Address" onChange={this.onAddrChange}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4}>
                                                <Form.Group controlId="landMark">
                                                    <Form.Control type="text" placeholder="Land Mark ( Optional )" onChange={this.onLandMarkChange} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group controlId="city">
                                                    <Form.Control type="text" placeholder="City" onChange={this.onCityChange} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group controlId="pincode">
                                                    <Form.Control type="number" value={this.state.pincode} placeholder="Pincode" onChange={this.onPincodeChange} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <Form.Group controlId="changeState">
                                                    <Form.Control
                                                        as="select"
                                                        className="mr-sm-2"
                                                        custom
                                                        onChange={this.onChangeState}>
                                                            <option value='null'>Select your state</option>
                                                            {StatesAndDistricts.map((data,i)=>(
                                                                <option key={i} value={[data.state,data.districts]}>{data.state} </option>
                                                            ))}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                        {this.state.districtArray.length!==0 ?
                                        <Col md={12}>
                                            <Form.Group controlId="changeState">
                                                <Form.Control
                                                    as="select"
                                                    className="mr-sm-2"
                                                    custom
                                                    onChange={this.onChangeDistrict}>
                                                        <option value='null'>Select your District</option>
                                                        {this.state.districtArray.map((data,i)=>(
                                                            <option key={i} value={data}>{data} </option>
                                                        ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col> 
                                        :null}
                                        </Row>
                                        <Button variant="danger" type="submit">
                                            Continue
                                        </Button>
                                    </Form>
                                </Card>
                            </Col>
                            <Col md={3}>
                             
                            </Col>
                        </Row>
                        {this.state.toShowErrorOrSuccessModal ? 
                     <ErrorOrSuccessModal type={this.state.type} open={this.state.toShowErrorOrSuccessModal} heading={this.state.successOrError.heading} body={this.state.successOrError.body} handleClose={this.toggleErrorOrSuccessModal}/>:null}
                    </Container>
                )
            }

        }else{
            return(
                <Container >
                    <Row className="posAbsolute">
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
        volunteerRequested:state.volunteer.volunteerRequested,
        volunteerData:state.volunteer.volunteerData
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
      getVolunteerById:(creds) => dispatch(getVolunteerById(creds)),
      registerVolunteer:(creds) => dispatch(registerVolunteer(creds))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(VolunteerDashboard);