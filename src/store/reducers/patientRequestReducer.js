const initState = {
    loading:false,
    patientRequest:false,
    error:null
}

const PatientReducer = (state = initState,action) => {
    switch(action.type){

        case 'PATIENT_REQUESTED':
        return {...state,patientRequest:true}

        case 'SHOW_PATIENT_LOADING':
        return {...state,loading:true}

        case 'ERROR_ADDING_PATIENT_REQUEST':
        return {...state,error:action.payload}

        default:
        return {...state}
    }
}

export default PatientReducer;
