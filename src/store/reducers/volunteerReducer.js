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
        assignedCases:null,
        gotAssignedCases:false,
        allCases:null,
        gotAllCases:false
    },
    requestAssigned:false
}

const VolunteerReducer = (state = initState,action) => {
    switch(action.type){

        case 'GOT_VOLUNTEER_DETAILS':
        return {...state,volunteerRequested:true,volunteerData:action.payload,loading:false}

        case 'VOLUNTEER_NOT_FOUND':
        return {...state,volunteerRequested:true,volunteerData:null}

        case 'VOLUNTEER_REGISTERED':
        return {...state,volunteerData:action.payload,loading:false}

        case 'GOT_ALL_CASES':
        let oldCases = state.cases;
        let newCases = {
            ...oldCases,
            allCases:action.payload,
            gotAllCases:true
        }
        return {...state,cases:newCases};

        case 'GOT_ASSIGNED_CASES':
        let oldCases1 = state.cases;
        let newCases1 = {
            ...oldCases1,
            assignedCases:action.payload,
            gotAssignedCases:true,
        }
        return {...state,cases:newCases1};

        case 'VOLUNTEER_REQUEST_ASSIGNED':
            let oldCases2 = state.cases;
            let oldAllCases = oldCases2.allCases;
            let oldAllCasesContent = oldAllCases.content;
            let requestId = action.payload.requestId;
            let volunteerId = action.payload.volunteerId;
            let newAllCasesContent = oldAllCasesContent.filter(data =>{
                return data.requestId !== requestId
            });
            let newAllCases = {
                ...oldAllCases,
                content:newAllCasesContent
            };
            /** ------------------------------------------------------------- */
            let oldAssignedCases = oldCases2.assignedCases;
            let oldAssignedCasesContent = oldAssignedCases.content;
            let assignedCasesContent = oldAllCasesContent.filter(data =>{
                return data.requestId === requestId
            });
            let oldRequestStatus =  assignedCasesContent[0].requestStatus;
            console.log('oldRequestStatus :', oldRequestStatus)
            let statusToPush = {
                "status": "ASSIGNED",
                "volunteerId": volunteerId,
                "updatedBy": action.payload.volunteerId,
                "eventTime": new Date(),
                "comments": "Request Assigned to volunteer ::"+volunteerId
            }
            oldRequestStatus.push(statusToPush);
            let newContentToPush = {
                ...assignedCasesContent[0],
                requestStatus:oldRequestStatus,
                currentStatus:'ASSIGNED'
            }
            console.log(newContentToPush)
           oldAssignedCasesContent.push(newContentToPush);

            let newAssignedCases =  {
                ...oldAssignedCases,
                content:oldAssignedCasesContent
            }
            console.log(newAssignedCases)
            let newCases2 = {
                ...oldCases2,
                assignedCases:newAssignedCases,
                allCases:newAllCases
            }
        return {...state,requestAssigned:true,loading:false,cases:newCases2}

        case 'MAKE_REQUEST_ASSIGNED_FALSE':
        return {...state,requestAssigned:false,loading:false}

        case 'SHOW_VOLUNTEER_LOADING':
        return {...state,loading:true}
        
        case 'CLOSE_VOLUNTEER_LOADING':
        return {...state,loading:false}

        default:
        return {...state}
    }
}

export default VolunteerReducer;