const initState = {
    authStatus:'',
    authConfirmation:'',
    loading:false
}
const authReducer = (state = initState,action) => {

    switch(action.type){

        case 'OTP_REQUESTED' :
            return { ...state,authStatus:'OTP Requested',authConfirmation:action.data,loading:false}

        case 'SMS_NOT_SENT' :
            return {...state,authStatus:'Sms not sent'}

        case 'SIGNIN_SUCCESSFULL' :
            return {...state,authStatus:'',loading:false}

        case 'OTP_INCORRECT' :
            return {...state,authStatus:'OTP Incorrect'}

        case 'SHOW_AUTH_LOADING':
            return {...state,loading:true}
        
        case 'CLOSE_AUTH_LOADING':
            return {...state,loading:false}

        case 'SIGNOUT_SUCCESS' :
            return {...state,authStatus:''}

        default:return {...state};
        
    }
}
export default authReducer