import React from 'react';
import 'typeface-roboto';

import { Router, Switch, Route } from 'react-router-dom';
import history from './helpers/Router/History/History';
import TopBar from './components/TopBar/TopBar';
import Homepage from './containers/Homepage/Homepage';
import SignIn from './components/SignIn/SignIn';
import UserSignUp from './containers/Users/UserSignUp/UserSignUp';
import Projects from './containers/Projects/Projects';

const App = () => (
  <Router history={history}>
    <div>
      <TopBar />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/projects" component={Projects} />
      </Switch>
    </div>
  </Router>
);

export default App;
