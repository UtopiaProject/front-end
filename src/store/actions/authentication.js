import * as actionTypes from './actionTypes';
import history from '../../helpers/Router/History/History';
import { auth } from '../firebase/index';

export const authenticateSuccess = (user) => {
  return {
    type: actionTypes.AUTHENTICATE_SUCCESS,
    user,
  };
};

export const authenticateFailure = (error) => {
  return {
    type: actionTypes.AUTHENTICATE_FAILURE,
    error,
  };
};

const saveToLocalStorage = (user) => {
  return (dispatch) => {
    localStorage.setItem('user', user.email);
    return dispatch(authenticateSuccess(user));
  };
};

const removeFromLocalStorage = (error) => {
  return (dispatch) => {
    localStorage.removeItem('user');
    return dispatch(authenticateFailure(error));
  };
};

export const isLoggedIn = () => {
  return (dispatch) => {
    const loggedUser = { email: localStorage.getItem('user') };
    if (loggedUser) return dispatch(authenticateSuccess(loggedUser));
    return dispatch(removeFromLocalStorage('LOGGED OUT'));
  };
};

export const authenticate = (user) => {
  const { email, password } = user;
  return (dispatch) => {
    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(saveToLocalStorage(user));
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(removeFromLocalStorage(error));
      });
  };
};
