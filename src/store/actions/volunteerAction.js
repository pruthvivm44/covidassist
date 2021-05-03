import axios from 'axios';
import { getUrl } from './url'

let url = getUrl;

export const gotVolunteerDetails = data => {
    return {
      type:'GOT_VOLUNTEER_DETAILS',
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
                console.log(response.data)
                // dispatch(gotVolunteerDetails(response.data));
            })
            .catch(function (error) {
                //handle error
                console.log(error)
                dispatch({type:'ERROR_GETTING_VOLUNTEER_DETAILS',error});
            });
    }
}