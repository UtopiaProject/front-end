import * as actionTypes from '../actions/actionTypes';

const initialState = {
  reference: null,
  error: null,
};

const fetchReferenceSuccess = (state, action) => {
  return {
    ...state,
    reference: action.reference,
  };
};

const updateReferenceFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REFERENCE_SUCCESS: return fetchReferenceSuccess(state, action);
    case actionTypes.UPDATE_REFERENCE_FAILURE: return updateReferenceFailure(state, action);
    default: return state;
  }
};

export default reducer;
