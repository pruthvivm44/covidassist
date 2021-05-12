import axios from 'axios';
import { getUrl } from './url'

let url = getUrl;
export const patientRequested = data => {
    return {
      type:'PATIENT_REQUESTED',
      payload:data
    };
}

export const patientRequest = (credentials) =>{
    return (dispatch,getState)=>{
        dispatch({type:'SHOW_PATIENT_LOADING'});
        axios({
            method: 'put',
            url: url+'patient/request',
            data:credentials,
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(function (response) {
                dispatch(patientRequested(response.data));
            })
            .catch(function (error) {
                //handle error
                dispatch({type:'ERROR_ADDING_PATIENT_REQUEST',error});
            });
    }
}

export const closePatientReqModal = ()=>{
    return (dispatch)=>{
        dispatch({type:'CLOSE_PATIENT_REQUESTED_SUCCESS_MODAL'});
    }
}

