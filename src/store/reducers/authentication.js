/* eslint-disable */

import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  error: null,
};

const authenticateSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
  };
};

const authenticateFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_SUCCESS: return authenticateSuccess(state, action);
    case actionTypes.AUTHENTICATE_FAILURE: return authenticateFailure(state, action);
    default: return state;
  }
};

export default reducer;
