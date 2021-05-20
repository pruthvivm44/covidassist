import { combineReducers } from 'redux'
import PatientReducer from './patientRequestReducer'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import VolunteerReducer from './volunteerReducer'
import LeadReducer from './leadReducer'
import DashboardReducer from './dashboardReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    patient: PatientReducer,
    firebase: firebaseReducer,
    volunteer:VolunteerReducer,
    leads:LeadReducer,
    dashboard:DashboardReducer
});

export default rootReducer;