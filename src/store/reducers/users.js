import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_SUCCESS: return createUserSuccess(state, action);
    case actionTypes.CREATE_USER_FAILURE: return createUserFailure(state, action);
    default: return state;
  }
};

export default reducer;
