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

const createUserFailure = (error) => {
  return {
    type: actionTypes.CREATE_USER_FAILURE,
    error,
  };
};

export const createUser = (user) => {
  return (dispatch) => {
    users.createUser(user)
      .then(() => {
        dispatch(actions.authenticate(user));
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(createUserFailure(error));
      });
  };
};

const fetchUserSuccess = (user) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAILURE,
    error,
  };
};

export const fetchUser = (userEmail) => {
  return (dispatch) => {
    users.readUser(userEmail)
      .then((snapshot) => {
        const userValue = Object.values(snapshot.val())[0];
        dispatch(fetchUserSuccess(userValue));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};

const fetchUsersSuccess = (userList) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: userList,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    users.readUsers(dispatch, fetchUsersSuccess);
  };
};
