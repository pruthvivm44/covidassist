const initState = {
    loading:false,
    volunteerRequested:false,
    volunteerData:null,
    error:null,
    type:null,
    successOrError:{
        heading:null,
        body:null,
    },
    cases:{
        activeCases:null,
        gotActiveCases:false,
        allCases:null,
        gotAllCases:false
    }
}

const VolunteerReducer = (state = initState,action) => {
    switch(action.type){

        case 'GOT_VOLUNTEER_DETAILS':
        return {...state,volunteerRequested:true,volunteerData:action.payload}

        case 'VOLUNTEER_NOT_FOUND':
        return {...state,volunteerRequested:true,volunteerData:null}

        case 'VOLUNTEER_REGISTERED':
        return {...state,volunteerData:action.payload}

        case 'GOT_ALL_CASES':
        let oldCases = state.cases;
        let newCases = {
            ...oldCases,
            allCases:action.payload,
            gotAllCases:true
        }
        return {...state,cases:newCases}

        case 'SHOW_VOLUNTEER_LOADING':
        return {...state,loading:true}
        
        case 'CLOSE_VOLUNTEER_LOADING':
        return {...state,loading:false}

        default:
        return {...state}
    }
}

export default VolunteerReducer;