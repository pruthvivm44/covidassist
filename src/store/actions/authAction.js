
export const signIn = (credentials) =>{
    return (dispatch,getState,{getFirebase})=>{
        dispatch({type:'SHOW_AUTH_LOADING'});
        const firebase = getFirebase();
        var credentialsph = '+91 '+credentials.phno ;
        firebase.auth().signInWithPhoneNumber(credentialsph, credentials.capatch)
        .then(function (confirmationResult) {
            localStorage.setItem('volunteerPh', credentials.phno);
            console.log('otp requested')
            dispatch({type:'OTP_REQUESTED',data:confirmationResult});
        }).catch(function (error) {
            dispatch({type:'CLOSE_AUTH_LOADING'});
            dispatch({type:'SMS_NOT_SENT',error});
        });
    }
}

export const confirmCode = (otp) =>{
    return (dispatch,getState,{getFirebase})=>{
        dispatch({type:'SHOW_AUTH_LOADING'});
        getState().auth.authConfirmation.confirm(otp).then(function  (result){
            var user = result.user;
            dispatch({type:'SIGNIN_SUCCESSFULL',user});
        }).catch(function (error) {
            dispatch({type:'CLOSE_AUTH_LOADING'});
            dispatch({type:'OTP_INCORRECT',error});
      });
    }
}

export const signOut = () =>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase = getFirebase();
        firebase.auth().signOut().then(function() {
            dispatch({type:'SIGNOUT_SUCCESS'});
          }).catch(function(error) {
            // An error happened.
          });
    }
}