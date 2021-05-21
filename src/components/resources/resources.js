import React from "react";
import { Container,Row,Col,Jumbotron, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class Resources extends React.Component {
    constructor(props){
        super(props);
        this.state={
            resources :[
                { 
                    title : {resourceTitle:'BBMP Resource for Bangalore',link:'https://apps.bbmpgov.in/covid19/index.html'},
                    titleContent:[{title:'',link:[],phno:[]}],
                    body:[{title:'BBMP Govt Website',content:['A Helpful resource for finding Bed, Ambulance services and many more .'],link:[],phno:[]}]
                },
                { 
                    title : {resourceTitle:'COVID Resources India',link:'https://www.covidresourcesindia.com/'},
                    titleContent:[{title:'',link:[],phno:[]}],
                    body:[{title:'Volunteer Website',content:['A comprehensive list of COVID resources across India. Made by Employee of Microsoft .'],link:[],phno:[]}]
                },
                { 
                    title : {resourceTitle:'India Covid Resources',link:'https://indiacovidresources.in/'},
                    titleContent:[{title:'',link:[],phno:[]}],
                    body:[{title:'Volunteer Website Powered by 200+ volunteers',content:['Powered by 200+ volunteers to provide verified covid resources pan India. DM us at @TheProductFolks, @CreatorsOfProd, or @kavirkaycee'],link:[],phno:[]}]
                },
                { 
                    title : {resourceTitle:'WORKBOOK COVID Care Resources India',link:'https://public.tableau.com/views/CovidHelp/Search?:language=en-GB&:display_count=y&publish=yes&:origin=viz_share_link&:showVizHome=no'},
                    titleContent:[{title:'',link:[],phno:[]}],
                    body:[{title:'Volunteer Website',content:['Developed by Women alumini of IIMs'],link:[],phno:[]}]
                },
                { 
                    title : {resourceTitle:'covid.resources.india',link:'https://www.instagram.com/covid.resources.india/'},
                    titleContent:[{title:'',link:[],phno:[]}],
                    body:[{title:'Instagram Account',content:['A Instagram Account helping who are in need of covid resources .'],link:[],phno:[]}]
                },
                { 
                    title : {resourceTitle:'India Covid help group',link:'https://www.facebook.com/groups/281693156866924/?ref=share'},
                    titleContent:[{title:'',link:[],phno:[]}],
                    body:[{title:'Facebook Page',content:['A Facebook page  helping who are in need of covid resources'],link:[{linkName:'https://covidgethelp.in/',linkTo:'https://covidgethelp.in/'}],phno:[]}]
                }
            ]
        }
    }
    render() { 
        return (  
            <Container fluid>
                <Row>
                    <Col md={6} className="p-3">
                        <div className="">
                            <h4>RESOURCES</h4>
                            <div className="pinkBorder"></div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Jumbotron className="pt-4 pb-4">
                            <h5>Before Proceeding here, Just have a look at our <Link to={'/leads'} target="_blank">LEADS</Link> Section and try to find a lead depending on the patient request. </h5>
                            <h6><strong className="redColor">DISCLAIMER : </strong>Please read our complete<Link to={'/disclaimer'} target="_blank"> DISCLAIMER</Link> here before using the resources .</h6>
                            {/* <Button variant="danger">Edit Profile</Button> */}
                        </Jumbotron>
                    </Col>
                </Row>
                <Container fluid>
                {this.state.resources.map(data=>(
                    <Card className="p-3 m-2">
                    <Row>
                        <Col md={6} className="text-center">
                            {data.title.link ?
                            <a href={data.title.link} rel="noreferrer" target="_blank" className="anchor">{data.title.resourceTitle}</a>
                            :
                            <h4 style={{textTransform:'uppercase'}} className="redColor">{data.title.resourceTitle}</h4>
                            }
                            {data.titleContent.map(data=>(
                                <>
                                <Row>
                                    <Col md="12" className="p-1 text-center">
                                        <h6>{data.title}</h6>
                                    </Col>
                                </Row>
                                {data.phno.length > 0 ? 
                                    <Row>
                                        <Col md="12" className="p-1">
                                            {data.phno.map(phoneNumber=>(
                                                <h6>{phoneNumber}</h6>
                                            ))}
                                        </Col>
                                    </Row>
                                :null}
                                 {data.link.length > 0 ? 
                                    <Row>
                                        <Col md="12" className="p-1">
                                            {data.link.map(link=>(
                                                <a href={link.linkTo} rel="noreferrer" target="_blank" className="link">{link.linkName}</a>
                                            ))}
                                        </Col>
                                    </Row>
                                :null}
                                </>
                            ))}
                        </Col>
                        <Col md={6} className="text-center">

                                    {data.body.map(body =>(
                                        <>
                                            <h5>{body.title}</h5>
                                            {body.content.length > 0 ? 
                                            <>
                                                {body.content.map(bodyContent=>(
                                                    <p>{bodyContent}</p>
                                                ))}
                                            </>:null}
                                            {body.content.length > 0 ? 
                                            <>
                                                {body.link.map(linkContent=>(
                                                    <a href={linkContent.linkTo} rel="noreferrer" target="_blank" className="link">{linkContent.linkName}</a>
                                                ))}
                                            </>:null}
                                        </>
                                    ))}
                                
                        </Col>
                    </Row>
                    </Card>
                ))}
                </Container>
            </Container>
        );
    }
}
 
export default Resources;