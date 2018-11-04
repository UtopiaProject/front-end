import { database } from './firebase';

// Create News Article
export const doCreateNewsArticle = (projectNewsArticle) => {
  const {
    projectId,
    title,
    description,
    createdAt,
  } = projectNewsArticle;
  // Get new ID
  const id = database.ref(`/projects/${projectId}/news`).push().key;
  // Save to database
  return database.ref(`/projects/${projectId}/news/${id}`).update({
    id,
    projectId,
    title,
    description,
    createdAt,
  });
};

// Read News Article
export const doReadNewsArticle = (id, projectId) => {
  return database
    .ref(`/projects/${projectId}/news`)
    .orderByChild('id')
    .equalTo(id)
    .once('value');
};

// Read News Article
export const doReadNewsArticles = (dispatch, callback, projectId) => {
  return database.ref(`/projects/${projectId}/news`).on('value', (snapshot) => {
    dispatch(callback(snapshot));
  });
};

// Update News Article
export const doUpdateNewsArticle = (projectNewsArticle) => {
  const {
    id,
    title,
    description,
    projectId,
  } = projectNewsArticle;
  return database.ref(`projects/${projectId}/${id}`).update({
    id,
    projectId,
    title,
    description,
  });
};
