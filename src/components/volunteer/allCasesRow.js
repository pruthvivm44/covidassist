import React from 'react';
import {Button,Spinner } from 'react-bootstrap';
import { connect } from 'react-redux'

class AllCasesRow extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false
        };
    }
    assignRequest = ()=>{
        this.setState({
            loading:true
        },()=>{
         this.props.assignNow(this.props.data.requestId);
        })
    }
    render(){
        let date = new Date(this.props.data.createdAt);
        return(
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.data.patientDetails.name}</td>
                <td>{this.props.data.serviceRequested}</td>
                <td>{this.props.data.address.district}</td>
                <td>{this.props.data.address.state}</td>
                <td className="text-center">{date.toDateString()} {date.toLocaleTimeString('en-US')}</td>
                <td className="text-center">{this.props.data.currentStatus}</td>
                <td className="text-center"><Button disabled={this.state.loading  && this.props.loading} variant="danger" onClick={this.assignRequest}>
                    Assign
                    {(this.state.loading && this.props.loading) ?
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="ml-1 mr-1 "
                        />:null}
                    </Button></td>
            </tr>
        )
    }

}
const mapStateToProps = (state) => {
    return{
        auth : state.firebase.auth,
        loading:state.volunteer.loading
    }
}

export default connect(mapStateToProps,null)(AllCasesRow);