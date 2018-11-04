/* eslint-disable */

import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authenticationReducer from './store/reducers/authentication';
import usersReducer from './store/reducers/users';
import projectsReducer from './store/reducers/projects';
import newsArticlesReducer from './store/reducers/newsArticles';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  users: usersReducer,
  projects: projectsReducer,
  newsArticles: newsArticlesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
