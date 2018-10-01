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
      });
    })
    .catch((error) => {
      console.log('[firebase users] user creation failed: ', error);
      return error;
    });
};

// Read User
export const doReadUser = (uid) => {
  return database.ref(`/users/${uid}`).once('value')
    .then((snapshot) => {
      return snapshot.val();
    })
    .catch((error) => {
      console.log('[firebase users] user read failed: ', error);
      return error;
    });
};

// Read Users
export const doReadUsers = () => {
  return database.ref('/users').on('value', (snapshot) => {
    return snapshot.val();
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
  });
};

// Delete User
export const doDeleteUser = (uid) => {
  return database.ref(`users/${uid}`).remove();
};
