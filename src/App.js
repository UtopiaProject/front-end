import React from 'react';
import 'typeface-roboto';

import { Router, Switch, Route } from 'react-router-dom';
import history from './helpers/Router/History/History';
import TopBar from './components/TopBar/TopBar';
import Homepage from './containers/Homepage/Homepage';
import SignIn from './components/SignIn/SignIn';
import UserSignUp from './containers/Users/UserSignUp/UserSignUp';
import Projects from './containers/Projects/Projects';
import ProjectProfile from './containers/Projects/ProjectProfile/ProjectProfile';
import ProjectForm from './containers/Projects/ProjectForm/ProjectForm';
import Users from './containers/Users/Users';
import UserProfile from './containers/Users/UserProfile/UserProfile';

const App = () => (
  <Router history={history}>
    <div>
      <TopBar />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/projects" exact component={Projects} />
        <Route path="/projects/:id/edit" component={ProjectForm} />
        <Route path="/projects/new" exact component={ProjectForm} />
        <Route path="/projects/:id" component={ProjectProfile} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/:email" component={UserProfile} />
      </Switch>
    </div>
  </Router>
);

export default App;
