import axios from 'axios';
import { getUrl } from './url'

let url = getUrl;

export const gotVolunteerDetails = data => {
    return {
      type:'GOT_VOLUNTEER_DETAILS',
      payload:data
    };
}
export const volunteerRegistered = data => {
    return {
      type:'VOLUNTEER_REGISTERED',
      payload:data
    };
}

export const getVolunteerById = (credentials) =>{
    return (dispatch,getState)=>{
        dispatch({type:'SHOW_VOLUNTEER_LOADING'});
        axios({
            method: 'get',
            url: url+'volunteer/find/'+credentials,
            data:credentials,
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(function (response) {
                dispatch(gotVolunteerDetails(response.data));
            })
            .catch(function (error) {
                //handle error
                if(error.response.status===404){
                    dispatch({type:'VOLUNTEER_NOT_FOUND'})
                }
                dispatch({type:'ERROR_GETTING_VOLUNTEER_DETAILS',error});
            });
    }
}

export const registerVolunteer = (credentials) =>{
    return (dispatch,getState)=>{
        dispatch({type:'SHOW_VOLUNTEER_LOADING'});
        axios({
            method: 'put',
            url: url+'volunteer/upsert/',
            data:credentials,
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(function (response) {
                dispatch(volunteerRegistered(response.data));
            })
            .catch(function (error) {
                dispatch({type:'ERROR_REGISTERING_VOLUNTEER',error});
            });
    }
}