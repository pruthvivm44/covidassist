import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider,useSelector } from 'react-redux'
import { ReactReduxFirebaseProvider, getFirebase,isLoaded  } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import Loading from './components/Loading'

const store = createStore(rootReducer,{},applyMiddleware( thunk.withExtraArgument({getFirebase})));

const rrfConfig = {
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

const fbConfig = {
    apiKey: "AIzaSyBRngP2XfonR60xcuIu33lnkoK7uQVTMP0",
    authDomain: "covidassistindia-ff13b.firebaseapp.com",
    projectId: "covidassistindia-ff13b",
    storageBucket: "covidassistindia-ff13b.appspot.com",
    messagingSenderId: "887027062270",
    appId: "1:887027062270:web:14bb81843e0625a2349caf",
    measurementId: "G-MVYB6B8R3J"
};
firebase.initializeApp(fbConfig)

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <Loading />;
  return children
}

ReactDOM.render(
  <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
          </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
