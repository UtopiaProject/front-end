import * as actionTypes from '../actions/actionTypes';

const initialState = {
  projects: null,
  error: null,
};

const fetchProjectsSuccess = (state, action) => {
  return {
    ...state,
    projects: action.projects,
  };
};

const fetchProjectsFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAILURE: return fetchProjectsFailure(state, action);
    default: return state;
  }
};

export default reducer;
