import * as actionTypes from './actionTypes';
import history from '../../helpers/Router/History/History';
import { projects } from '../firebase';

export const filterProjectsByTitle = (title) => {
  return {
    type: actionTypes.FILTER_PROJECTS_TITLE,
    title: title.toLowerCase(),
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
      .then(() => {
        history.push('/projects');
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

const fetchProjectsSuccess = (snapshot) => {
  let projectList;
  if (snapshot.val()) {
    projectList = Object.values(snapshot.val());
  }
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

const updateProjectFailure = (error) => {
  return {
    type: actionTypes.UPDATE_PROJECT_FAILURE,
    error,
  };
};

export const updateProject = (project) => {
  return (dispatch) => {
    projects.doUpdateProject(project)
      .then(() => {
        history.push(`/projects/${project.id}`);
      })
      .catch((error) => {
        dispatch(updateProjectFailure(error));
      });
  };
};

const deleteProjectSuccess = () => {
  return {
    type: actionTypes.DELETE_PROJECT_SUCCESS,
  };
};

const deleteProjectFailure = (error) => {
  return {
    type: actionTypes.DELETE_PROJECT_FAILURE,
    error,
  };
};

export const deleteProject = (id) => {
  return (dispatch) => {
    projects.doDeleteProject(id)
      .then(() => {
        dispatch(deleteProjectSuccess());
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(deleteProjectFailure(error));
      });
  };
};
