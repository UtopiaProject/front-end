import { database, auth } from './firebase';
import * as authentication from './auth';

// Create User
export const createUser = (user) => {
  const {
    name,
    birthdate,
    gender,
    email,
    password,
    lattes,
    linkedin,
    stackOverflow,
    summary,
    type,
  } = user;
  return authentication.doCreateUserWithEmailAndPassword(email, password)
    .then(() => {
      const uid = auth.currentUser.uid;
      return database.ref(`users/${uid}`).set({
        name,
        birthdate,
        gender,
        email,
        lattes,
        linkedin,
        stackOverflow,
        summary,
        type,
      });
    })
    .catch((error) => {
      return error;
    });
};

// Read User
export const readUser = (email) => {
  return database.ref('users/').orderByChild('email').equalTo(email).once('value');
};

// Read Users
export const readUsers = (dispatch, callback) => {
  return database.ref('users/').on('value', (snapshot) => {
    dispatch(callback(Object.values(snapshot.val())));
  });
};

// Update User
export const updateUser = (user, uid) => {
  const {
    name,
    birthdate,
    gender,
    email,
    lattes,
    linkedin,
    stackOverflow,
    summary,
    type,
  } = user;
  return database.ref(`users/${uid}`).update({
    name,
    birthdate,
    gender,
    email,
    lattes,
    linkedin,
    stackOverflow,
    summary,
    type,
  });
};

// Delete User
export const deleteUser = (uid) => {
  return database.ref(`users/${uid}`).remove();
};
