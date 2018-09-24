import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC7NNzpP-nzrL87JJG9wW3IT8ggBwZVzkY',
  authDomain: 'reuwsaat-project-utopia.firebaseapp.com',
  databaseURL: 'https://reuwsaat-project-utopia.firebaseio.com',
  projectId: 'reuwsaat-project-utopia',
  storageBucket: 'reuwsaat-project-utopia.appspot.com',
  messagingSenderId: '249861004526',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
