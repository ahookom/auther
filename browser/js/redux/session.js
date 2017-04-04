import axios from 'axios';
import { browserHistory } from 'react-router';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REJECT_CREDENTIALS = 'REJECT_CREDENTIALS';

/* ------------   ACTION CREATORS     ------------------ */

const setUser = user => ({ type: SET_CURRENT_USER, user });
const reject = () => ({ type: REJECT_CREDENTIALS });
/* ------------       REDUCER     ------------------ */

const initialState = {
  currentUser: '',
  loggedIn: false,
  attemptFailed: false
}

export default function reducer (state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_CURRENT_USER:
      newState = Object.assign({}, state, {currentUser: action.user, loggedIn: true, attemptFailed: false});
      return newState;
    case REJECT_CREDENTIALS:
      newState = Object.assign({}, state, {attemptFailed: true});
      return newState;
    }
    return state;
}
/* ------------       DISPATCHERS     ------------------ */

export const validateCredentials = (userInfoObj) => dispatch => {
  axios.post('/api/login', userInfoObj)
       .then(res => {
         if (res.data) {
           dispatch(setUser(res.data));
           browserHistory.push('/');
         } else {
           dispatch(reject());
         }

       });
};
