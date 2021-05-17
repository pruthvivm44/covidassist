import React from 'react';
import { Row, Container, Col,Button,Form,Card,Alert,Spinner, Image} from 'react-bootstrap'
import { connect } from 'react-redux'
import { signIn } from '../../../store/actions/authAction'
import { confirmCode } from '../../../store/actions/authAction'
import firebase from 'firebase/app'
import 'firebase/auth'
import volImage from '../../../images/vol1.png'

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state={
            telephone:'',
            regexp : /^[0-9\b]+$/,
            otp:''
        }
    }
    componentDidMount () {
        //Recapatcha used by firebase to sign in or signup and it will be invisible
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",
          {
          size:"invisible"
          // other options
          });
    }
    onHandleTelephoneChange = (e) =>{
        let telephone = e.target.value;
        if (telephone === '' || this.state.regexp.test(telephone)) {
            this.setState({ telephone: telephone });
        }
    }
    requestOTP = (e) =>{
        e.preventDefault();
        var phoneno = /^\d{10}$/;
        this.authTemp=null;
        if(this.state.telephone.match(phoneno))
        {
            const appVerifier = window.recaptchaVerifier;
            const data ={
                phno :this.state.telephone,
                capatch:appVerifier,
                otp:null
            };
            this.props.signIn(data);
        }
        else{

        }
    }
    otpChange = e =>{
        let otp = e.target.value;
        if (otp === '' || this.state.regexp.test(otp)) {
            this.setState({ otp: otp });
        }
    }
    confirmCode = (event) =>{
        event.preventDefault();
        if(this.state.otp.length===6){
           this.props.confirmCode(this.state.otp);
        }else{
            alert('OTP Invalid');
        }
    }
    render(){
        return(
            <>
            <div id="recaptcha-container"></div>
            <Container>
                
                <Row>
                    <Col md={6} className="p-3">
                        <div className="">
                            <h4>VOLUNTEER LOGIN</h4>
                            <div className="pinkBorder"></div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <Card className="p-5  w-100">
                                <div  className="text-center">
                                    <h3>LOGIN NOW</h3>
                                </div>
                                <Form.Group controlId="priMobileNo" className="mt-3">
                                    <Form.Control value={this.state.telephone} type="number" placeholder="Mobile Number" onChange={this.onHandleTelephoneChange} maxLength={10}/>
                                </Form.Group>
                                {(this.props.authStatus === 'OTP Requested' || this.props.authStatus === 'OTP Incorrect') ?
                                <>
                                <Form.Group controlId="otp">
                                        <Form.Control maxLength="6" name="otp" value={this.state.otp} onChange={this.otpChange} placeholder="Enter Your OTP" aria-label="mobnumber" aria-describedby="basic-addon1"/>
                                    </Form.Group>
                                    <Button disabled={this.props.loading} variant="danger" type="submit" onClick={this.confirmCode}>Submit OTP</Button>
                                </>:
                                <>
                                    <Button disabled={this.props.loading} variant="danger" type="submit" onClick={this.requestOTP}>Request OTP</Button>
                                </>
                                }
                                {this.props.authStatus==='SMS_NOT_SENT'?
                                <>
                                    <Alert className="mt-3" variant="danger">
                                            Could not send the OTP please check your phone number and try again .
                                        </Alert>
                                </>
                                :
                                null
                                }
                                {this.props.authStatus==='OTP Incorrect'?
                                <>
                                    <Alert className="mt-3" variant="danger">
                                            InCorrect OTP Please check.
                                        </Alert>
                                </>
                                :
                                null
                                }
                                {this.props.loading ? 
                                    <Container>
                                        <Row >
                                            <Col md={12}>
                                                <div className="text-center mt-4">
                                                    <Spinner className="loading" animation="grow" variant="danger"/>
                                                </div>
                                            </Col>
                                        </Row>
                                </Container>
                                :null}
                            </Card>
                        </div>
                    </Col>
                    <Col md={6}  className="text-center d-flex align-items-center p-3" >
                        <div className="text-center">
                            <Image src={volImage} alt="covid Assist india image" width="70%"/>
                        </div>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        auth : state.firebase.auth,
        authStatus :state.auth.authStatus,
        loading:state.auth.loading
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
      signIn:(creds) => dispatch(signIn(creds)),
      confirmCode:(creds) => dispatch(confirmCode(creds)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);

