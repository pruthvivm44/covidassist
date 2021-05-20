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
    statusChanged:false,
    successModalState:{
        title:'',
        body:''
    },
    allCasesPagination:{
        currentPageNumber:null,
        pageSize:null,
        totalPages:null,
    },
    assignedCasesPagination:{
        currentPageNumber:null,
        pageSize:null,
        totalPages:null,

    },
    errorAssigningRequest:false
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

        case 'STATUS_CHANGED':
            let requestId1 = action.payload.requestId;            
            let oldCases3 = state.cases;
            let oldAssignedCases1 = oldCases3.assignedCases;
            let oldAssignedCases1Content = oldAssignedCases1.content;

            if(action.payload.reqStatus.status==='UNASSIGNED'){
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
                };
                let newSuccessModalState = {
                    title:'Status Changed',
                    body:action.payload.reqStatus.status+' successfully'
                };
                return {...state,statusChanged:true,loading:false,cases:newCases3,successModalState:newSuccessModalState}
            }else{
                let oldAssignedCasesContentObj = oldAssignedCases1Content.filter(data =>{
                    return data.requestId === requestId1
                });
    
                let oldRequestStatus1 =  oldAssignedCasesContentObj[0].requestStatus;
                let statusToPush1 = action.payload.reqStatus;
                oldRequestStatus1.push(statusToPush1);
                let contentObjToUpdateIndex1 = oldAssignedCases1Content.findIndex((data) => {
                    return data.requestId === requestId1
                });
    
                if(contentObjToUpdateIndex1 >= 0){
                    const contentSlice1 =  oldAssignedCases1Content.slice();
                    const contentToupdate = contentSlice1[contentObjToUpdateIndex1];
                    const updateUnitContent1 = {
                        ...contentToupdate,
                        requestStatus:oldRequestStatus1,
                        currentStatus:action.payload.reqStatus.status
                    }
                    contentSlice1[contentObjToUpdateIndex1] = updateUnitContent1;
                    let newAssignedCases6 = {
                        ...oldAssignedCases1,
                        content:contentSlice1
                    };
    
                    let newCases6={
                        ...oldCases3,
                        assignedCases:newAssignedCases6
                    }
                    return {...state,cases:newCases6,loading:false}
                }
                else{
                    return {...state,loading:false}
                }
            }

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

        case 'COMMENT_ADDED':
            let requestIdToSearch = action.payload.requestId;
            let newComments = action.payload.comments
            let oldCases5 = state.cases;
            let oldAssignedCases5 = oldCases5.assignedCases;
            let oldAssignedCasesContent5 = oldAssignedCases5.content;
            let contentObjToUpdateIndex = oldAssignedCasesContent5.findIndex((data) => {
                return data.requestId === requestIdToSearch
            });

            if(contentObjToUpdateIndex >= 0){
                const contentSlice =  oldAssignedCasesContent5.slice();
                const contentToupdate = contentSlice[contentObjToUpdateIndex];
                const updateUnitContent = {
                    ...contentToupdate,
                    comments:newComments
                }
                contentSlice[contentObjToUpdateIndex] = updateUnitContent;
                let newAssignedCases5 = {
                    ...oldAssignedCases5,
                    content:contentSlice
                };

                let newCases5 ={
                    ...oldCases5,
                    assignedCases:newAssignedCases5
                }
                return {...state,cases:newCases5,loading:false}
            }
            else{
                return {...state,loading:false}
            }

        case 'MAKE_REQUEST_ASSIGNED_FALSE':
            let newSuccessModalState1 = {
                title:'',
                body:''
            };
        return {...state,requestAssigned:false,statusChanged:false,loading:false,successModalState:newSuccessModalState1,errorAssigningRequest:false}

        case 'SHOW_VOLUNTEER_LOADING':
        return {...state,loading:true}
        
        case 'CLOSE_VOLUNTEER_LOADING':
        return {...state,loading:false}

        case 'ERROR_ASSIGNING_REQUEST':
        return {...state,errorAssigningRequest:true}
        
        default:return {...state}
    }
}

export default VolunteerReducer;