import { combineReducers } from 'redux'
import PatientReducer from './patientRequestReducer'

const rootReducer = combineReducers({
    patient : PatientReducer,
});

export default rootReducer;