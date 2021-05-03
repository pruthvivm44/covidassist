import React from 'react';
import { connect } from 'react-redux'
import { getVolunteerById } from '../../store/actions/volunteerAction.js'

class VolunteerDashboard extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getVolunteerById(this.props.auth.uid);
    }
    render(){
        return(
            <h1>Hello dashboard</h1>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        auth : state.firebase.auth,
    }
}

// dispatch the action or call the functions of auth
const mapDispatchToProps = (dispatch) =>{
    return {
      getVolunteerById:(creds) => dispatch(getVolunteerById(creds)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(VolunteerDashboard);