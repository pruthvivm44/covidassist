import React from 'react';
import { Row, Container, Col,Button,Form,Card,Alert} from 'react-bootstrap'
import { connect } from 'react-redux'
import { signIn } from '../../../store/actions/authAction'
import { confirmCode } from '../../../store/actions/authAction'
import firebase from 'firebase/app'
import 'firebase/auth'

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
        console.log(' i am heer')
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
                    <Col md={12} className="mt-3 mb-3">
                        <h4>VOLUNTEER REGISTRATION</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Card className="p-5">
                            <div  className="text-center">
                                <h3>SIGN IN NOW</h3>
                            </div>
                            <Form.Group controlId="priMobileNo" className="mt-3">
                                <Form.Control value={this.state.telephone} type="number" placeholder="Mobile Number" onChange={this.onHandleTelephoneChange} maxLength={10}/>
                            </Form.Group>
                            {(this.props.authStatus === 'OTP Requested' || this.props.authStatus === 'OTP Incorrect') ?
                            <>
                              <Form.Group controlId="otp">
                                    <Form.Control maxLength="6" name="otp" value={this.state.otp} onChange={this.otpChange} placeholder="Enter Your OTP" aria-label="mobnumber" aria-describedby="basic-addon1"/>
                                </Form.Group>
                                <Button variant="danger" type="submit" onClick={this.confirmCode}>Submit OTP</Button>
                            </>:
                            <>
                                <Button variant="danger" type="submit" onClick={this.requestOTP}>Request OTP</Button>
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
                          
                        </Card>
                    </Col>
                    <Col md={6}  className="text-center">
                        <Card>
                            <h1>hello</h1>
                        </Card>
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

