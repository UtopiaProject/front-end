import React from 'react';
import 'typeface-roboto';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import Homepage from './containers/Homepage/Homepage';

const App = () => (
  <div className="App">
    <TopBar />
    <Homepage />
  </div>
);


export default App;
