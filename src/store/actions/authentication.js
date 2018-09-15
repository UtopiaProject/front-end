import * as actionTypes from './actionTypes';
import history from '../../helpers/Router/History/History';

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
  return (dispatch) => {
    if (user) {
      dispatch(authenticateSuccess(user));
      history.push('/');
    } else {
      dispatch(authenticateFailure('error'));
    }
  };
};
