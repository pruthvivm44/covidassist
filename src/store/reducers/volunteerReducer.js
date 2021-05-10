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
    requestAssigned:false,
    requestUnAssigned:false,
    allCasesPagination:{
        currentPageNumber:null,
        pageSize:null,
        totalPages:null,
    },
    assignedCasesPagination:{
        currentPageNumber:null,
        pageSize:null,
        totalPages:null,

    }
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
        };
        let tp = action.payload.totalPages;
        let tpArr = [];
        for (let i=0;i<tp;i++){
            tpArr.push(i);
        }
        let newAllCasesPagination = {
            currentPageNumber:action.payload.pageable.pageNumber,
            pageSize:action.payload.pageable.pageSize,
            totalPages:tpArr,
        };
        return {...state,cases:newCases,allCasesPagination:newAllCasesPagination};

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
           oldAssignedCasesContent.push(newContentToPush);

            let newAssignedCases =  {
                ...oldAssignedCases,
                content:oldAssignedCasesContent
            }
            let newCases2 = {
                ...oldCases2,
                assignedCases:newAssignedCases,
                allCases:newAllCases
            }
        return {...state,requestAssigned:true,loading:false,cases:newCases2}

        case 'VOLUNTEER_REQUEST_UNASSIGNED':
            let requestId1 = action.payload.requestId;
            let volunteerId1 = action.payload.volunteerId;
            
            let oldCases3 = state.cases;
            let oldAssignedCases1 = oldCases3.assignedCases;
            let oldAssignedCases1Content = oldAssignedCases1.content;
            let oldAllCases1 = oldCases3.allCases;
            let oldAllCasesContentArr = oldAllCases1.content;

            let oldAssignedCasesContentObj = oldAssignedCases1Content.filter(data =>{
                return data.requestId === requestId1
            });
            let oldRequestStatus1 =  oldAssignedCasesContentObj[0].requestStatus;
            let statusToPush1 = {
                "status": "UNASSIGNED",
                "volunteerId": volunteerId1,
                "updatedBy": volunteerId1,
                "eventTime": new Date(),
                "comments": "Request UN Assigned from volunteer ::"+volunteerId1
            }
            oldRequestStatus1.push(statusToPush1);
            let newContentObjToPush = {
                ...oldAssignedCasesContentObj[0],
                requestStatus:oldRequestStatus1,
                currentStatus:'UNASSIGNED'
            };
            oldAllCasesContentArr.push(newContentObjToPush);
            let newAllCases1 =  {
                ...oldAllCases1,
                content:oldAllCasesContentArr
            };
            /*------------------------------------------------- */

            let newAssignedCasesContent = oldAssignedCases1Content.filter(data =>{
                return data.requestId !== requestId1
            });
            let newAssignedCases1 = {
                ...oldAssignedCases1,
                content:newAssignedCasesContent
            }; 

            let newCases3 = {
                ...oldCases3,
                assignedCases:newAssignedCases1,
                allCases:newAllCases1
            }
        return {...state,requestUnAssigned:true,loading:false,cases:newCases3}

        case 'MAKE_ALL_CASES_NULL':
            let oldCases4 = state.cases;
            let newCases4 = {
                ...oldCases4,
                allCases:null
            };
            let oldAllCasesPagination = state.allCasesPagination;
            let newAllCasesPagination1 = null;
            if(action.pageNumber===0){
                newAllCasesPagination1={
                    ...oldAllCasesPagination
                }
            }else{
                newAllCasesPagination1={
                    ...oldAllCasesPagination,
                    currentPageNumber:action.pageNumber
                };
            }
        return {...state,cases:newCases4,allCasesPagination:newAllCasesPagination1}

        case 'MAKE_REQUEST_ASSIGNED_FALSE':
        return {...state,requestAssigned:false,requestUnAssigned:false,loading:false}

        case 'SHOW_VOLUNTEER_LOADING':
        return {...state,loading:true}
        
        case 'CLOSE_VOLUNTEER_LOADING':
        return {...state,loading:false}

        default:
        return {...state}
    }
}

export default VolunteerReducer;