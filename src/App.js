import React from 'react';
import 'typeface-roboto';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar';
import Homepage from './containers/Homepage/Homepage';
import Footer from './components/Footer/Footer';
import SignIn from './components/SignIn/SignIn';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <TopBar />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/signin" component={SignIn} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);


export default App;
