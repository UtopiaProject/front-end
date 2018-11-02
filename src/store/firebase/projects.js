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
  } = project;
  return database.ref('/projects').push().set({
    id: database.ref('/projects').push().getKey(),
    author,
    title,
    picture,
    introduction,
    description,
    createdAt,
  });
};

// Read Project
export const doReadProject = (id) => {
  return database.ref('/projects/').orderByChild('id').equalTo(id).once('value');
};

// Read Projects
export const doReadProjects = (dispatch, callback) => {
  return database.ref('/projects').on('value', (snapshot) => {
    dispatch(callback(Object.values(snapshot.val())));
  });
};

// Update Project
export const doUpdateProject = (project, id) => {
  const {
    author,
    title,
    picture,
    introduction,
    description,
  } = project;
  return database.ref(`projects/${id}`).set({
    id,
    author,
    title,
    picture,
    introduction,
    description,
  });
};

// Delete Project
export const doDeleteProject = (id) => {
  return database.ref(`/projects/${id}`).remove();
};
