import { Router } from "@reach/router";
import React from 'react';
import { Devices, Home, Wiki } from './pages';
import './styles/style.scss';

function App() {
  return (
    <Router>
      <Home path="/" />
      <Devices path="/devices" >

      </Devices>
      <Wiki path="/wiki" />
    </Router>
  );
}

export default App;
