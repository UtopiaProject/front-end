import * as actionTypes from '../actions/actionTypes';

const initialState = {
  project: null,
  projects: null,
  error: null,
};

const filterProjectsByTitle = (state, action) => {
  const filterRule = project => project.title.toLowerCase().startsWith(action.title);
  let filteredProjects = state.projects.filter(filterRule);
  if (filteredProjects.length === 0 || action.title.length === 0) {
    filteredProjects = initialState.projects;
  }
  return {
    ...state,
    projects: filteredProjects,
  };
};

const advanceProjectStepSuccess = (state, action) => {
  return {
    ...state,
    project: null,
  };
};

const advanceProjectStepFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const resetProjectFundingSuccess = (state, action) => {
  return {
    ...state,
    project: action.project,
  };
};

const resetProjectFundingFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const createProjectSuccess = (state, action) => {
  return {
    ...state,
    project: null,
  };
};

const createProjectFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
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

const fetchProjectSuccess = (state, action) => {
  return {
    ...state,
    project: action.project,
  };
};

const fetchProjectFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const updateProjectFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const deleteProjectSuccess = (state, action) => {
  return {
    ...state,
    project: null,
  };
};

const deleteProjectFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_PROJECTS_TITLE: return filterProjectsByTitle(state, action);
    case actionTypes.ADVANCE_PROJECT_STEP_SUCCESS: return advanceProjectStepSuccess(state, action);
    case actionTypes.ADVANCE_PROJECT_STEP_FAILURE: return advanceProjectStepFailure(state, action);
    case actionTypes.RESET_PROJECT_FUNDING_SUCCESS: return resetProjectFundingSuccess(state, action);
    case actionTypes.RESET_PROJECT_FUNDING_FAILURE: return resetProjectFundingFailure(state, action);
    case actionTypes.CREATE_PROJECT_SUCCESS: return createProjectSuccess(state, action);
    case actionTypes.CREATE_PROJECT_FAILURE: return createProjectFailure(state, action);
    case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAILURE: return fetchProjectsFailure(state, action);
    case actionTypes.FETCH_PROJECT_SUCCESS: return fetchProjectSuccess(state, action);
    case actionTypes.FETCH_PROJECT_FAILURE: return fetchProjectFailure(state, action);
    case actionTypes.UPDATE_PROJECT_FAILURE: return updateProjectFailure(state, action);
    case actionTypes.DELETE_PROJECT_SUCCESS: return deleteProjectSuccess(state, action);
    case actionTypes.DELETE_PROJECT_FAILURE: return deleteProjectFailure(state, action);
    default: return state;
  }
};

export default reducer;
