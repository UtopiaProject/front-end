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

export const authenticate = (user) => {
  const { email, password } = user;
  return (dispatch) => {
    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(authenticateSuccess(user));
        history.push('/projects');
      })
      .catch(() => {
        const message = ' user not found.';
        dispatch(authenticateFailure(message));
      });
  };
};
