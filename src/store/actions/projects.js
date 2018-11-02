import * as actionTypes from './actionTypes';
import { projects } from '../firebase';

export const filterProjectsByTitle = (title) => {
  return {
    type: actionTypes.FILTER_PROJECTS_TITLE,
    title: title.toLowerCase(),
  };
};

const createProjectSuccess = (project) => {
  return {
    type: actionTypes.CREATE_PROJECT_SUCCESS,
    project,
  };
};

const createProjectFailure = (error) => {
  return {
    type: actionTypes.CREATE_PROJECT_FAILURE,
    error,
  };
};

export const createProject = (project) => {
  return (dispatch) => {
    projects.doCreateProject(project)
      .then((snapshot) => {
        dispatch(createProjectSuccess(snapshot.val()));
      })
      .catch((error) => {
        dispatch(createProjectFailure(error));
      });
  };
};

const fetchProjectSuccess = (project) => {
  return {
    type: actionTypes.FETCH_PROJECT_SUCCESS,
    project,
  };
};

const fetchProjectFailure = (error) => {
  return {
    type: actionTypes.FETCH_PROJECT_FAILURE,
    error,
  };
};

export const fetchProject = (id) => {
  return (dispatch) => {
    projects.doReadProject(id)
      .then((snapshot) => {
        const projectValue = Object.values(snapshot.val())[0];
        dispatch(fetchProjectSuccess(projectValue));
      })
      .catch((error) => {
        dispatch(fetchProjectFailure(error));
      });
  };
};

const fetchProjectsSuccess = (projectList) => {
  return {
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    projects: projectList,
  };
};

export const fetchProjects = () => {
  return (dispatch) => {
    projects.doReadProjects(dispatch, fetchProjectsSuccess);
  };
};
