import { database } from './firebase';

// Read Reference
export const doReadReference = (dispatch, callback, projectId) => {
  return database.ref(`/projects/${projectId}/references`).on('value', (snapshot) => {
    dispatch(callback(snapshot));
  });
};

// Update Reference
export const doUpdateReference = (projectReference) => {
  const {
    description,
    projectId,
    updatedAt,
  } = projectReference;
  return database.ref(`projects/${projectId}/references`).update({
    projectId,
    description,
    updatedAt,
  });
};
