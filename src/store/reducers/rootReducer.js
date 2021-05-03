import { combineReducers } from 'redux'
import PatientReducer from './patientRequestReducer'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    patient: PatientReducer,
    firebase: firebaseReducer
});

export default rootReducer;