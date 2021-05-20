const initState = {
    loading:false,
    error:null,
    statContent:null,
    gotStats:false
}

const DashboardReducer = (state = initState,action) => {
    switch(action.type){
        case 'GOT_DASHBOARD_STATS':
        // return {...state,loading:false,error:'Error getting stats Please try again later',gotStats:true}
        return {...state,statContent:action.payload,loading:false,error:null,gotStats:true};

        case 'SHOW_DASHBOARD_STATS_LOADING':
        return {...state,loading:true}

        case 'ERROR_GETTING_STATS':
        return {...state,loading:false,error:'Error getting stats Plese try again later'}

        default:return {...state}
    }
}

export default DashboardReducer;
