import axios from 'axios';
import { getUrl } from './url'

let url = getUrl;
let pageLimit = 10;

export const leadAdded = data => {
    return {
      type:'LEAD_ADDED',
      payload:data
    };
}

export const gotAllLeads = data=>{
    return {
        type:'GOT_ALL_LEADS',
        payload:data
      };
}

export const leadUpdated = data=>{
    return {
        type:'LEAD_UPDATED',
        payload:data
      };
}

export const addLeadRequest = (credentials) =>{
    return (dispatch,getState)=>{
        console.log(credentials)
        dispatch({type:'SHOW_LEAD_LOADING'});
        axios({
            method: 'put',
            url: url+'leads/request',
            data:credentials,
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(function (response) {
                    dispatch(leadAdded(credentials));
            })
            .catch(function (error) {
                //handle error
                console.log(error)
                dispatch({type:'CLOSE_LEAD_ADDED_SUCCESS_MODAL'})
                dispatch({type:'ERROR_ADDING_LEAD_REQUEST',error});
            });
    }
}

export const updateLead = (credentials) =>{
    return (dispatch,getState)=>{
        dispatch({type:'SHOW_UPDATE_LOADING'});
        axios({
            method: 'put',
            url: url+'leads/request',
            data:credentials,
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(function (response) {
                    dispatch(leadUpdated(credentials));
            })
            .catch(function (error) {
                //handle error
                console.log(error)
                dispatch({type:'ERROR_UPDATING_LEAD',error});
            });
    }
}

export const closeLeadReqModal = ()=>{
    return(dispatch)=>{
        dispatch({type:'CLOSE_LEAD_ADDED_SUCCESS_MODAL'})
    }
}

export const getAllLeads = (credentials) =>{
    return (dispatch,getState)=>{
        let params={
            ...credentials,
            limit:pageLimit,
        };
        axios({
            method: 'get',
            url: url+'leads/request/findAll',
            params:params,
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(function (response) {
                dispatch(gotAllLeads(response.data));
            })
            .catch(function (error) {
                //handle error
                dispatch({type:'ERROR_ADDING_PATIENT_REQUEST',error});
            });
    }
}