import { database } from './firebase';

// Create Comment
export const doCreateComment = (comment) => {
  const {
    projectId,
    author,
    description,
    createdAt,
  } = comment;
  // Get new ID
  const id = database.ref(`/projects/${projectId}/comments`).push().key;
  // Save to database
  return database.ref(`/projects/${projectId}/comments/${id}`).update({
    id,
    projectId,
    author,
    description,
    createdAt,
  });
};

// Read Comments
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

// Upvote Comment
export const doUpvoteComment = (comment) => {
  const {
    id,
    projectId,
  } = comment;
  return database
    .ref(`/projects/${projectId}/comments/${id}/upvotes`)
    .transaction(currentUpvotes => (currentUpvotes || 0) + 1);
};

// Downvote Comment
export const doDownvoteComment = (comment) => {
  const {
    id,
    projectId,
  } = comment;
  return database
    .ref(`/projects/${projectId}/comments/${id}/downvotes`)
    .transaction(currentDownvotes => (currentDownvotes || 0) + 1);
};

// Delete Comment
export const doDeleteComment = (comment) => {
  return database
    .ref(`/projects/${comment.projectId}/comments/${comment.id}`)
    .remove();
};
