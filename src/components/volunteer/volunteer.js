import React from 'react';
import { connect } from 'react-redux'
import SignIn from './auth/signIn';
import VolunteerDashboard from './volunteerDashboard';

class Volunteer extends React.Component {

    render(){
        if(this.props.auth.uid){
            return(
                <VolunteerDashboard />
            )
        }else{
            return(
                <SignIn />
            )
        }
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
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Volunteer);