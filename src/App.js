import React from 'react';
import 'typeface-roboto';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import Homepage from './containers/Homepage/Homepage';
import Footer from './components/Footer/Footer';

const App = () => (
  <div className="App">
    <TopBar />
    <Homepage />
    <Footer />
  </div>
);


export default App;
