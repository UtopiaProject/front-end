import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  users: null,
  error: null,
};

const createUserSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
  };
};

const createUserFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const fetchUserSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
  };
};

const fetchUserFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const fetchUsersSuccess = (state, action) => {
  return {
    ...state,
    users: action.users,
  };
};

const fetchUsersFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};


const filterUsersByName = (state, action) => {
  const filterRule = user => user.name.toLowerCase().startsWith(action.name);
  let filteredUsers = state.users.filter(filterRule);
  if (filteredUsers.length === 0 || action.title.length === 0) {
    filteredUsers = initialState.users;
  }
  return {
    ...state,
    users: filteredUsers,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_SUCCESS: return createUserSuccess(state, action);
    case actionTypes.CREATE_USER_FAILURE: return createUserFailure(state, action);
    case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
    case actionTypes.FETCH_USER_FAILURE: return fetchUserFailure(state, action);
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAILURE: return fetchUsersFailure(state, action);
    case actionTypes.FILTER_USERS_NAME: return filterUsersByName(state, action);
    default: return state;
  }
};

export default reducer;
