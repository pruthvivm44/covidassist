import axios from 'axios';
import { getUrl } from './url'

let url = getUrl;

export const gotDashBoardStats = data => {
    return {
      type:'GOT_DASHBOARD_STATS',
      payload:data
    };
}

export const getDasboardStats = (credentials) =>{
    return (dispatch,getState)=>{
        dispatch({type:'SHOW_DASHBOARD_STATS_LOADING'});
        axios({
            method: 'get',
            url: url+'stats/dashboard',
            data:credentials,
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(function (response) {
                dispatch(gotDashBoardStats(response.data));
            })
            .catch(function (error) {
                //handle error
                if(error.response){
                    if(error.response.status===404 || error.response.status===400){
                        dispatch({type:'ERROR_GETTING_STATS'})
                    }else{
                        dispatch({type:'ERROR_GETTING_STATS',error});
                    }
                }else{
                    dispatch({type:'ERROR_GETTING_STATS',error});
                }
            });
    }
}