import { database } from './firebase';

// Create Project
export const doCreateProject = (project) => {
  const {
    author,
    title,
    picture,
    introduction,
    description,
    createdAt,
    fundingTarget,
    currency,
  } = project;
  const currentFunding = 0;
  // Get new ID
  const id = database.ref('/projects').push().key;
  // Save to database
  return database.ref(`/projects/${id}`).update({
    id,
    author,
    title,
    picture,
    introduction,
    description,
    createdAt,
    fundingTarget,
    currency,
    currentFunding,
  });
};

// Read Project
export const doReadProject = (id) => {
  return database
    .ref('/projects/')
    .orderByChild('id')
    .equalTo(id)
    .once('value');
};

// Read Projects
export const doReadProjects = (dispatch, callback) => {
  return database.ref('/projects').on('value', (snapshot) => {
    dispatch(callback(snapshot));
  });
};

// Fund Project
export const doFundProject = (funding) => {
  const {
    id,
    author,
    funds,
    currency,
    createdAt,
  } = funding;
  const funderId = database.ref(`projects/${id}/funders`).push().key;
  database.ref(`projects/${id}/funders/${funderId}`).update({
    id,
    author,
    funds,
    currency,
    createdAt,
  });
  return database.ref(`projects/${id}`).update({
    currentFunding: funds,
  });
};

// Update Project
export const doUpdateProject = (project) => {
  const {
    id,
    author,
    title,
    picture,
    introduction,
    description,
    fundingTarget,
    currency,
  } = project;
  return database.ref(`projects/${id}`).update({
    id,
    author,
    title,
    picture,
    introduction,
    description,
    fundingTarget,
    currency,
  });
};

// Delete Project
export const doDeleteProject = (id) => {
  return database.ref(`projects/${id}`).remove();
};
