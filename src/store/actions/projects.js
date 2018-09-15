import * as actionTypes from './actionTypes';

export const fetchProjectsSuccess = (projects) => {
  return {
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    projects,
  };
};

export const fetchProjectsFailure = (error) => {
  return {
    type: actionTypes.FETCH_PROJECTS_FAILURE,
    error,
  };
};

export const fetchProjects = (projects) => {
  return (dispatch) => {
    if (projects) {
      dispatch(fetchProjectsSuccess(projects));
    } else {
      dispatch(fetchProjectsFailure('error'));
    }
  };
};
