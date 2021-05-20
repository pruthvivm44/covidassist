import React from 'react';
import { Row, Col,Card,Container} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { getDasboardStats } from '../../store/actions/dasboardAction'
import { connect } from 'react-redux'
import Loading from '../Loading';

class Helped extends React.Component {
    componentDidMount() {
        this.props.getDasboardStats();
    }
    render(){
        if(this.props.gotStats){
            return(
                <Row className="mt-3">
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="patientRequestText text-center" style={{fontSize:'30px'}}>SO FAR WE HAVE</Card.Title>
                                <Row className="p-3">
                                    {this.props.error ? 
                                    <Col md={12} className="text-center">
                                        <h4 className="text-center">{this.props.error}</h4>
                                    </Col>:
                                    <>
                                      <Col md="3" className="text-center">
                                        <p className="helpNumber">{this.props.statContent.statRecord.totalRequestsCount}</p>
                                        <h4>Total requests</h4>
                                    </Col>
                                    <Col md="3" className="text-center">
                                        <p className="helpNumber">{this.props.statContent.statRecord.closedRequestsCount}</p>
                                        <h4>Helped Patients</h4>
                                    </Col>
                                    <Col md="3" className="text-center">
                                        <p className="helpNumber">{this.props.statContent.statRecord.volunteersCount}</p>
                                        <h4>Volunteer's</h4>
                                    </Col>
                                    <Col md="3" className="text-center">
                                        <p className="helpNumber">{this.props.statContent.statRecord.leadsCount}</p>
                                        <h4>Total Leads</h4>
                                    </Col>
                                    </>}
                                </Row>
                                <Row className="py-2 d-flex align-items-center">
                            <Col md={12} className="text-center mt-1 mb-1">
                            {/* <a className="socialmd" href="https://www.facebook.com/WaterDuct-112494253800332/" rel="noopener noreferrer" target="_blank"  >
                                    <FontAwesomeIcon className="m-4 redColor" icon={faFacebookF} />
                             </a> */}
                                <a className="socialmd" href="https://twitter.com/covidAssistInd" rel="noopener noreferrer" target="_blank" >
                                    <FontAwesomeIcon className="m-4 redColor" icon={faTwitter} />
                                </a>
                                {/* <a className="socialmd " href="https://www.linkedin.com/company/waterduct" rel="noopener noreferrer" target="_blank" >
                                    <FontAwesomeIcon className="m-4 redColor" icon={faLinkedinIn} />
                                </a> */}
                                <a className="socialmd" href="https://www.instagram.com/covidassistindia/" rel="noopener noreferrer" target="_blank" >
                                    <FontAwesomeIcon className="m-4 redColor" icon={faInstagram} />
                                </a>
                                {/* <a className="socialmd" href="# " rel="noopener noreferrer" target="_blank" >
                                    <FontAwesomeIcon className="m-4" icon={faPinterestP} />
                                </a>
                                <a className="socialmd" href="https://www.youtube.com/channel/UCSCr4SDgoe-KkYKQNK7S06A/?guided_help_flow=5" rel="noopener noreferrer" target="_blank" >
                                    <FontAwesomeIcon className="m-4" icon={faYoutube} />
                                </a> */}
                                </Col>
                            </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
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
        error:state.dashboard.error,
        statContent:state.dashboard.statContent,
        loading:state.dashboard.loading,
        gotStats:state.dashboard.gotStats
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
        getDasboardStats:() => dispatch(getDasboardStats())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Helped);