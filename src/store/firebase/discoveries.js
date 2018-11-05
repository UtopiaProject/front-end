import { database } from './firebase';

// Read Discovery
export const doReadDiscovery = (dispatch, callback, projectId) => {
  return database.ref(`/projects/${projectId}/discoveries`).on('value', (snapshot) => {
    dispatch(callback(snapshot));
  });
};

// Update Discovery
export const doUpdateDiscovery = (projectDiscovery) => {
  const {
    description,
    projectId,
    updatedAt,
  } = projectDiscovery;
  return database.ref(`projects/${projectId}/discoveries`).update({
    projectId,
    description,
    updatedAt,
  });
};
