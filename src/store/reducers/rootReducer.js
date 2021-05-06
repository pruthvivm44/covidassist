import { combineReducers } from 'redux'
import PatientReducer from './patientRequestReducer'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import VolunteerReducer from './volunteerReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    patient: PatientReducer,
    firebase: firebaseReducer,
    volunteer:VolunteerReducer
});

export default rootReducer;