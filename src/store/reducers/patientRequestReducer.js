const initState = {
    loading:false,
    patientRequest:false,
    error:null,
    type:null,
    successOrError:{
        heading:null,
        body:null,
    },
}

const PatientReducer = (state = initState,action) => {
    switch(action.type){

        case 'PATIENT_REQUESTED':
        let successOrErrorNew = {
            heading:'Request placed',
            body:'Your Request has been registered with us our volunteer will be contacting you soon .'
        }
        return {...state,patientRequest:true,type:'success',successOrError:successOrErrorNew,loading:false}

        case 'CLOSE_PATIENT_REQUESTED_SUCCESS_MODAL':
        let successOrErrorNew1 = {
            heading:null,
            body:null
        }
        return {...state,patientRequest:false,type:null,successOrError:successOrErrorNew1}

        case 'SHOW_PATIENT_LOADING':
        return {...state,loading:true}

        case 'ERROR_ADDING_PATIENT_REQUEST':
        return {...state,error:action.payload,loading:false}

        default:
        return {...state}
    }
}

export default PatientReducer;
