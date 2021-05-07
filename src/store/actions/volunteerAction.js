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

export const gotAllCases = data =>{
    return {
        type:'GOT_ALL_CASES',
        payload:data
      };
}

export const requestAssignedForVolunteer = data =>{
    return{
        type : 'VOLUNTEER_REQUEST_ASSIGNED',
        payload :data
    }
}

export const gotAssignedCase =  data =>{
    return {
        type:'GOT_ASSIGNED_CASES',
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
                let volArr = [];
                volArr.push(credentials);
                dispatch(volunteerRegistered(credentials));
            })
            .catch(function (error) {
                dispatch({type:'ERROR_REGISTERING_VOLUNTEER',error});
            });
    }
}

export const getAllCases = (credentials) =>{
    return (dispatch,getState)=>{
        axios({
            method: 'GET',
            url: url+'patient/request/findAll/',
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(function (response) {
                dispatch(gotAllCases(response.data))
            })
            .catch(function (error) {
                dispatch({type:'ERROR_FETCHING_REQUESTS',error});
            });
    }
}

export const getCasesByVolunteerId = (credentials) =>{
    return (dispatch,getState)=>{
        dispatch({type:'SHOW_VOLUNTEER_LOADING'});
        axios({
            method: 'GET',
            url: url+'patient/request/findAll/',
            params: {
                volunteerId:credentials,
            },
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(function (response) {
                dispatch(gotAssignedCase(response.data))
            })
            .catch(function (error) {
                dispatch({type:'ERROR_FETCHING_REQUESTS',error});
            });
    }
}

export const assignRequest = (credentials) =>{
    return (dispatch,getState)=>{
        dispatch({type:'SHOW_VOLUNTEER_LOADING'});
        axios({
            method: 'PUT',
            url: url+'patient/assign/'+credentials.requestId,
            params: {
                volunteerId:credentials.volunteerId,
            },
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(function (response) {
                let data = {
                    requestId:credentials.requestId,
                    volunteerId:credentials.volunteerId
                };
                dispatch(requestAssignedForVolunteer(data));
            })
            .catch(function (error) {
                dispatch({type:'ERROR_ASSIGNING_REQUEST',error});
            });
    }
}
export const makeRequestAssignedFalse = (credentials) =>{
    return (dispatch)=>{
        dispatch({type:'MAKE_REQUEST_ASSIGNED_FALSE'});
    }
}