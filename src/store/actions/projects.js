import * as actionTypes from './actionTypes';
import history from '../../helpers/Router/History/History';
import { projects } from '../firebase';

export const filterProjectsByTitle = (title) => {
  return {
    type: actionTypes.FILTER_PROJECTS_TITLE,
    title: title.toLowerCase(),
  };
};

const fundProjectFailure = (error) => {
  return {
    type: actionTypes.UPDATE_PROJECT_FAILURE,
    error,
  };
};

export const fundProject = (funding) => {
  return (dispatch) => {
    projects.fundProject(funding)
      .then(() => {
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(fundProjectFailure(error));
      });
  };
};

const approveProjectFailure = (error) => {
  return {
    type: actionTypes.UPDATE_PROJECT_FAILURE,
    error,
  };
};

export const approveProject = (approver) => {
  return (dispatch) => {
    projects.approveProject(approver)
      .then(() => {
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(approveProjectFailure(error));
      });
  };
};

const disapproveProjectFailure = (error) => {
  return {
    type: actionTypes.UPDATE_PROJECT_FAILURE,
    error,
  };
};

export const disapproveProject = (disapprover) => {
  return (dispatch) => {
    projects.disapproveProject(disapprover)
      .then(() => {
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(disapproveProjectFailure(error));
      });
  };
};

const reapproveProjectFailure = (error) => {
  return {
    type: actionTypes.UPDATE_PROJECT_FAILURE,
    error,
  };
};

export const reapproveProject = (reapprover) => {
  return (dispatch) => {
    projects.reapproveProject(reapprover)
      .then(() => {
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(reapproveProjectFailure(error));
      });
  };
};

const rejectProjectFailure = (error) => {
  return {
    type: actionTypes.UPDATE_PROJECT_FAILURE,
    error,
  };
};

export const rejectProject = (rejector) => {
  return (dispatch) => {
    projects.rejectProject(rejector)
      .then(() => {
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(rejectProjectFailure(error));
      });
  };
};

const advanceProjectStepSuccess = (project) => {
  return {
    type: actionTypes.ADVANCE_PROJECT_STEP_SUCCESS,
    project,
  };
};

const advanceProjectStepFailure = (error) => {
  return {
    type: actionTypes.ADVANCE_PROJECT_STEP_FAILURE,
    error,
  };
};

export const advanceProjectStep = (project) => {
  return (dispatch) => {
    projects.advanceProjectStep(project)
      .then((snapshot) => {
        dispatch(advanceProjectStepSuccess(snapshot.val()));
        history.push('/projects');
      })
      .catch(error => dispatch(advanceProjectStepFailure(error)));
  };
};

const resetProjectFundingSuccess = () => {
  return {
    type: actionTypes.RESET_PROJECT_FUNDING_SUCCESS,
  };
};

const resetProjectFundingFailure = (error) => {
  return {
    type: actionTypes.RESET_PROJECT_FUNDING_FAILURE,
    error,
  };
};

export const resetProjectFunding = (project) => {
  return (dispatch) => {
    projects.resetProjectFunding(project)
      .then(() => {
        dispatch(resetProjectFundingSuccess());
        history.push('/projects');
      })
      .catch(error => dispatch(resetProjectFundingFailure(error)));
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
    projects.createProject(project)
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
    projects.getProjectById(id)
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
    projects.getProjects(dispatch, fetchProjectsSuccess);
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
    projects.updateProject(project)
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
    projects.deleteProject(id)
      .then(() => {
        dispatch(deleteProjectSuccess());
        history.push('/projects');
      })
      .catch((error) => {
        dispatch(deleteProjectFailure(error));
      });
  };
};
