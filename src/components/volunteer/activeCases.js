import React from 'react';
import {Button,Table } from 'react-bootstrap';

class ActiveCases extends React.Component {
    render(){
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                                    <th>#</th>
                                    <th>Patient Name</th>
                                    <th>Mobile Number</th>
                                    <th>Care Taker Name</th>
                                    <th>District</th>
                                    <th>State</th>
                                    <th >Sevice Required</th>
                                    <th>View</th>
                                    <th>Un-assign</th>
                                    </tr>                
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Prathap</td>
                                        <td>9741920643</td>
                                        <td>Somesh</td>
                                        <td>Tumkur</td>
                                        <td>Karnataka</td>
                                        <td>Oxygen Bed</td>
                                        <td><a href="# ">view</a></td>
                                        <td><Button variant="danger">un-Assign</Button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Prathap</td>
                                        <td>9741920643</td>
                                        <td>Somesh</td>
                                        <td>Tumkur</td>
                                        <td>Karnataka</td>
                                        <td>Oxygen Bed</td>
                                        <td><a href="# ">view</a></td>
                                        <td><Button variant="danger">un-Assign</Button></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Prathap</td>
                                        <td>9741920643</td>
                                        <td>Somesh</td>
                                        <td>Tumkur</td>
                                        <td>Karnataka</td>
                                        <td>Oxygen Bed</td>
                                        <td><a href="# ">view</a></td>
                                        <td><Button variant="danger">un-Assign</Button></td>

                                    </tr>
                                </tbody>
            </Table>                              

        )
    }
}
export default ActiveCases;
        