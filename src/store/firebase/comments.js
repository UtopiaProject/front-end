import { database } from './firebase';

// Create Comment
export const doCreateComment = (comment) => {
  const {
    projectId,
    description,
    createdAt,
  } = comment;
  // Get new ID
  const id = database.ref(`/projects/${projectId}/comments`).push().key;
  // Save to database
  return database.ref(`/projects/${projectId}/comments/${id}`).update({
    id,
    projectId,
    description,
    createdAt,
  });
};

// Read Comment
export const doReadComments = (dispatch, callback, projectId) => {
  return database.ref(`/projects/${projectId}/comments`).on('value', (snapshot) => {
    dispatch(callback(snapshot));
  });
};

// Update Comment
export const doUpdateComment = (comment) => {
  const {
    id,
    description,
    projectId,
  } = comment;
  return database.ref(`/projects/${projectId}/comments/${id}`).update({
    id,
    description,
    projectId,
  });
};

// Delete Comment
export const doDeleteComment = (comment) => {
  return database
    .ref(`/projects/${comment.projectId}/comments/${comment.id}`)
    .remove();
};
