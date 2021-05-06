import React from 'react';
import {Button } from 'react-bootstrap';

class AllCasesRow extends React.Component {

    render(){
        let date = new Date(this.props.data.createdAt);
        return(
            <tr>
                <td>1</td>
                <td>{this.props.data.patientDetails.name}</td>
                <td>{this.props.data.serviceRequested}</td>
                <td>{this.props.data.address.district}</td>
                <td>{this.props.data.address.state}</td>
                <td className="text-center">{date.toDateString()} {date.toLocaleTimeString('en-US')}</td>
                <td className="text-center">Active</td>
                <td className="text-center"><Button variant="danger">Assign</Button></td>
            </tr>
        )
    }

}
export default AllCasesRow;
