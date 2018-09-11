import * as actionTypes from './actionTypes';

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
    } else {
      dispatch(authenticateFailure('error'));
    }
  };
};
