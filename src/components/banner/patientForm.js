import React from 'react';
import { Row, Container, Col,Button,Form} from 'react-bootstrap'
import ErrorOrSuccessModal from '../shared/errorOrSuccessModal';
import {StatesAndDistricts}  from '../shared/statesAndDistricts'

class PatientForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            patientName:null,
            srf_id:null,
            buNo:null,
            covRes:null,
            vacTaken:null,
            patAge:null,
            careTakerName:null,
            priMobNo:null,
            secMobNo:null,
            admittedToHospital:'false',
            hospName:null,
            hospAddr:null,
            address:null,
            landMark:null,
            city:null,
            pincode:null,
            stateName:null,
            districtArray:[],
            district:null,
            serviceRequired:null,
            description:null,
            toShowErrorOrSuccessModal:false,
            type:null,
            successOrError:{
                heading:null,
                body:null,
            },
            coMorbidities:[]
        }
    }
    onPatientNameChange = (e)=>{
        this.setState({
            patientName:e.target.value
        });
    }
    onSrfIdChange = (e)=>{
        this.setState({
            srf_id:e.target.value
        });
    }
    onBuNoChange = (e)=>{
        this.setState({
            buNo:e.target.value
        });
    }
    onCovResChange = (e)=>{
        this.setState({
            covRes:e.target.value
        });
    }
    onVacTakenChange=(e)=>{
        this.setState({
            vacTaken:e.target.value
        });
    }
    onPatAgeChange = (e)=>{
        if(e.target.value<=0){
            alert('Enter a valid Age');
        }else{
            this.setState({
                patAge:e.target.value
            });
        }
    }
    onPatGenderChange = (e)=>{
        this.setState({
            patGender:e.target.value
        });
    }
    oncareTakeNameChange = (e)=>{
        this.setState({
            careTakerName:e.target.value
        });
    }
    onPriMobNoChange = (e)=>{
        this.setState({
            priMobNo:e.target.value
        });
    }
    onSecMobNoChange = (e)=>{
        this.setState({
            secMobNo:e.target.value
        });
    }
    relWithPatChange = (e)=>{
        this.setState({
            relWithPat:e.target.value
        });
    }
    onAdmittedToHospitalChange = (event) =>{
        this.setState({
            admittedToHospital:event.target.value
        });
    }
    onHospNameChange = (e)=>{
        this.setState({
            hospName:e.target.value
        });
    }
    onHospAddrChange = (e)=>{
        this.setState({
            hospAddr:e.target.value
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
            toShowErrorOrSuccessModal:!this.state.toShowErrorOrSuccessModal
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
    submit = (e)=>{
        e.preventDefault();
        console.log(this.state)
    }
    onCoMorbitiesChange = (e)=>{
        let coMorbiditiesArr = this.state.coMorbidities;
        if(e.target.checked){
            coMorbiditiesArr.push(e.target.value)
            this.setState({
                coMorbidities:coMorbiditiesArr
            });
        }else{
            let newcoMorbiditiesArr = this.state.coMorbidities.filter(data=>{
                return data !== e.target.value;
            });
            this.setState({
                coMorbidities:newcoMorbiditiesArr
            });
        }
    }
    render(){
        return(
            <Container>
                <Form>
                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="ptName">
                                <Form.Label>Patient Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Patient Name" onChange={this.onPatientNameChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="srfId">
                                <Form.Label>SRF_ID</Form.Label>
                                <Form.Control type="text" placeholder="SRF_ID ( Optional )" onChange={this.onSrfIdChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="buNumber">
                                <Form.Label>BU Number</Form.Label>
                                <Form.Control type="text" placeholder="BU Number ( Optional )" onChange={this.onBuNoChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label> Covid Test Result</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    id="covResult"
                                    onChange={this.onCovResChange}
                                    custom>
                                    <option value="null">Choose...</option>
                                    <option value="+ve">+ ve</option>
                                    <option value="-ve">- ve</option>
                                    <option value="Not Tested">Not Tested</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                            <Form.Label> Vaccination Taken ?</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    id="vaccTaken"
                                    onChange={this.onVacTakenChange}
                                    custom>
                                    <option value="null">Choose...</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="ptAge">
                                <Form.Label>Patient Age</Form.Label>
                                <Form.Control type="number" placeholder="age" onChange={this.onPatAgeChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Patient Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    id="patGender"
                                    onChange={this.onPatGenderChange}
                                    custom>
                                    <option value="null">Choose...</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="ctName">
                                <Form.Label>Care Taker Name</Form.Label>
                                <Form.Control type="text" placeholder="Care Taker Name" onChange={this.oncareTakeNameChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="priMobileNo">
                                <Form.Label>Primary Mobile Number</Form.Label>
                                <Form.Control type="number" placeholder="Primary Mobile Number" onChange={this.onPriMobNoChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="secMobileNo">
                                <Form.Label>Secondary Mobile Number</Form.Label>
                                <Form.Control type="text" placeholder="Secondary Mobile Number" onChange={this.onSecMobNoChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="relWithPat">
                                <Form.Label>Relationship with patient</Form.Label>
                                <Form.Control type="text" placeholder="Relationship with patient ( Optional )" onChange={this.relWithPatChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="admitToHos">
                                <Form.Label >Admitted to Hospital</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    custom
                                    onChange={this.onAdmittedToHospitalChange}>
                                    <option value="0">Choose...</option>
                                    <option value={'true'}>Yes</option>
                                    <option value={'false'}>No</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.admittedToHospital === 'true' ?  
                        <>
                        <Col md={4}>
                            <Form.Group controlId="hospName">
                                <Form.Label>Hospital Name</Form.Label>
                                <Form.Control type="text" placeholder="Hospital Name" onChange={this.onHospNameChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="hospAddr">
                                <Form.Label>Hospital Address</Form.Label>
                                <Form.Control type="text" placeholder="Hospital Address"  onChange={this.onHospAddrChange}/>
                            </Form.Group>
                        </Col>
                        </>:null}
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group controlId="addressLine1">
                                <Form.Label>Address </Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Address" onChange={this.onAddressChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="landMark">
                                <Form.Label>Land Mark</Form.Label>
                                <Form.Control type="text" placeholder="Land Mark ( Optional )" onChange={this.onLandMarkChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" onChange={this.onCityChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="pincode">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control type="text" placeholder="Pincode" onChange={this.onPincodeChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="changeState">
                                <Form.Label >Select your State</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    custom
                                    onChange={this.onChangeState}>
                                        <option value='null'>Select</option>
                                        {StatesAndDistricts.map((data,i)=>(
                                            <option key={i} value={[data.state,data.districts]}>{data.state} </option>
                                        ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        {this.state.districtArray.length!==0 ?
                        <Col md={4}>
                            <Form.Group controlId="changeState">
                                <Form.Label >Select your District</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    custom
                                    onChange={this.onChangeDistrict}>
                                        <option value='null'>Select</option>
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
                            <Form.Group controlId="changeState">
                                <Form.Label >Service Required</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    custom
                                    onChange={this.onChangeService}>
                                        <option value='null'>Select</option>
                                        <option value='General Bed Request'>General Bed Request</option>
                                        <option value='Bed with oxygen'>Bed with oxygen</option>
                                        <option value='ICU Bed + ventilator'>ICU Bed + ventilator</option>
                                        <option value='Ambulance Service'>Ambulance Service</option>
                                        <option value='Plasma Request'>Plasma Request</option>
                                        <option value='Oxygen Concentrator On Rent'>Oxygen Concentrator On Rent</option>
                                        <option value='Medicine'>Medicine</option>
                                        <option value='Nursing Care'>Nursing Care</option>

                                </Form.Control>
                            </Form.Group>
                        </Col> 
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group controlId="bpAndSugar">
                                <Form.Label>I am already suffering with </Form.Label>
                                <Form.Check inline label="BP" type={'checkbox'} id={`inline-type-1`} value={'BP'} className="ml-3" onChange={this.onCoMorbitiesChange} />
                                <Form.Check inline label="Diabetes" type={'checkbox'} id={`inline-type-2`} value={'Diabetes'}className="ml-3" onChange={this.onCoMorbitiesChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group controlId="description">
                                <Form.Label>Want to tell us anything ?</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="description ( Optional )" onChange={this.onDescriptionChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="danger" type="submit" onClick={this.submit}>
                        Submit
                    </Button>
                </Form>
                {this.state.toShowErrorOrSuccessModal ? 
                 <ErrorOrSuccessModal open={this.state.toShowErrorOrSuccessModal} heading={this.state.successOrError.heading} body={this.state.successOrError.body} handleClose={this.toggleErrorOrSuccessModal}/>:null}
            </Container>
        )
    }
}
export default PatientForm;