import { database, auth } from './firebase';
import * as authentication from './auth';

// Create User
export const doCreateUser = (user) => {
  const {
    name,
    surname,
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
        surname,
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
      console.log('[firebase users] user creation failed: ', error);
      return error;
    });
};

// Read User
export const doReadUser = (uid) => {
  return database.ref(`users/${uid}`).once('value');
};

// Read Users
export const doReadUsers = (dispatch, callback) => {
  return database.ref('/users/').on('value', (snapshot) => {
    const data = [];
    snapshot.forEach((ss) => { data.push(ss.val()); });
    dispatch(callback(data));
  });
};

// Update User
export const doUpdateUser = (user, uid) => {
  const {
    name,
    surname,
    birthdate,
    gender,
    email,
    lattes,
    linkedin,
    stackOverflow,
    summary,
    type,
  } = user;
  return database.ref(`users/${uid}`).set({
    name,
    surname,
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
export const doDeleteUser = (uid) => {
  return database.ref(`users/${uid}`).remove();
};