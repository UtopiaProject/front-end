import * as actionTypes from './actionTypes';
import history from '../../helpers/Router/History/History';
import { users } from '../firebase/index';

export const createUserSuccess = (user) => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    user,
  };
};

export const createUserFailure = (error) => {
  return {
    type: actionTypes.CREATE_USER_FAILURE,
    error,
  };
};

export const createUser = (user) => {
  return (dispatch) => {
    users.doCreateUser(user)
      .then(() => {
        dispatch(createUserSuccess(user));
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(createUserFailure(error));
      });
  };
};
