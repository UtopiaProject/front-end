import * as actionTypes from '../actions/actionTypes';

const initialState = {
  discovery: null,
  error: null,
};

const fetchDiscoverySuccess = (state, action) => {
  return {
    ...state,
    discovery: action.discovery,
  };
};

const updateDiscoveryFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DISCOVERY_SUCCESS: return fetchDiscoverySuccess(state, action);
    case actionTypes.UPDATE_DISCOVERY_FAILURE: return updateDiscoveryFailure(state, action);
    default: return state;
  }
};

export default reducer;
