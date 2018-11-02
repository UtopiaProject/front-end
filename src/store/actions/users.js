import * as actionTypes from './actionTypes';
import * as actions from './index';
import history from '../../helpers/Router/History/History';
import { users } from '../firebase';

export const filterUsersByName = (name) => {
  return {
    type: actionTypes.FILTER_USERS_NAME,
    name: name.toLowerCase(),
  };
};

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
        dispatch(actions.authenticate(user));
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(createUserFailure(error));
      });
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAILURE,
    error,
  };
};

export const fetchUser = (userEmail) => {
  return (dispatch) => {
    users.doReadUser(userEmail)
      .then((snapshot) => {
        const userValue = Object.values(snapshot.val())[0];
        dispatch(fetchUserSuccess(userValue));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};

export const fetchUsersSuccess = (userList) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: userList,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAILURE,
    error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    users.doReadUsers(dispatch, fetchUsersSuccess);
  };
};
