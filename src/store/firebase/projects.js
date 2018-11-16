import { database } from './firebase';

export const createProject = (project) => {
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

export const getProjectById = (id) => {
  return database
    .ref('/projects/')
    .orderByChild('id')
    .equalTo(id)
    .once('value');
};

export const getProjects = (dispatch, callback) => {
  return database.ref('/projects').on('value', (snapshot) => {
    dispatch(callback(snapshot));
  });
};

export const fundProject = (funding) => {
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

export const resetProjectFunding = (project) => {
  const {
    id,
  } = project;
  return database.ref(`projects/${id}`).update({
    currentFunding: 0,
  });
};

export const approveProject = (approver) => {
  const {
    id,
    author,
    createdAt,
  } = approver;
  const approverId = database.ref(`projects/${id}/approvers`).push().key;
  return database.ref(`projects/${id}/approvers/${approverId}`).update({
    id,
    author,
    createdAt,
  });
};

export const disapproveProject = (disapprover) => {
  const {
    id,
    author,
    createdAt,
  } = disapprover;
  const disapproverId = database.ref(`projects/${id}/disapprovers`).push().key;
  return database.ref(`projects/${id}/disapprovers/${disapproverId}`).update({
    id,
    author,
    createdAt,
  });
};

export const reapproveProject = (reapprover) => {
  const {
    id,
    author,
    createdAt,
  } = reapprover;
  const reapproverId = database.ref(`projects/${id}/reapprovers`).push().key;
  return database.ref(`projects/${id}/reapprovers/${reapproverId}`).update({
    id,
    author,
    createdAt,
  });
};

export const rejectProject = (rejectors) => {
  const {
    id,
    author,
    createdAt,
  } = rejectors;
  const rejectorsId = database.ref(`projects/${id}/rejectors`).push().key;
  return database.ref(`projects/${id}/rejectors/${rejectorsId}`).update({
    id,
    author,
    createdAt,
  });
};

export const advanceProjectStep = (project) => {
  const {
    id,
  } = project;
  return database
    .ref(`/projects/${id}/currentStep`)
    .transaction(currentStep => (currentStep + 1));
};

export const updateProject = (project) => {
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

export const deleteProject = (id) => {
  return database.ref(`projects/${id}`).remove();
};
