const initState = {
    loading:false,
    updateLoading:false,
    leadAdded:false,
    error:null,
    type:null,
    successOrError:{
        heading:null,
        body:null,
    },
    allLeads:null,
    allLeadsPagination:{
        currentPageNumber:null,
        pageSize:null,
        totalPages:null,
    },
}

const LeadReducer = (state = initState,action) => {
    switch(action.type){

        case 'LEAD_ADDED':
            let successOrErrorNew = {
                heading:'Request placed',
                body:'Thank you for your Lead .'
            }
            return {...state,leadAdded:true,type:'success',successOrError:successOrErrorNew,loading:false}
    
        case 'CLOSE_LEAD_ADDED_SUCCESS_MODAL':
            let successOrErrorNew1 = {
                heading:null,
                body:null
            }
        return {...state,leadAdded:false,type:null,successOrError:successOrErrorNew1,loading:false};

        case 'GOT_ALL_LEADS':
            let tp = action.payload.totalPages;
            let tpArr = [];
            for (let i=0;i<tp;i++){
                tpArr.push(i);
            }
            let newAllLeadsPagination = {
                currentPageNumber:action.payload.pageable.pageNumber,
                pageSize:action.payload.pageable.pageSize,
                totalPages:tpArr,
            };
        return {...state,allLeads:action.payload,allLeadsPagination:newAllLeadsPagination};

        case 'LEAD_UPDATED':
            let newObj = action.payload;
            let allOldLeads = state.allLeads;
            let allOldLeadsContent = allOldLeads.content;

            let contentObjToUpdateIndex = allOldLeadsContent.findIndex((data) => {
                return data.requestId === newObj.requestId
            });
            if(contentObjToUpdateIndex >= 0){
                const contentSlice =  allOldLeadsContent.slice();
                contentSlice[contentObjToUpdateIndex] = newObj;
                let newAllLeads = {
                    ...allOldLeads,
                    content:contentSlice
                };
                return {...state,allLeads:newAllLeads,updateLoading:false}
            }else{
                return{...state,updateLoading:false};

            }
        case 'SHOW_LEAD_LOADING':
        return {...state,loading:true};

        case 'SHOW_UPDATE_LOADING':
        return {...state,updateLoading:true};

        default:return {...state}
    }
}
export default LeadReducer;
