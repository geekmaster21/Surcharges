import React from 'react';
import { Router } from "@reach/router";
import { LatestRelease } from "./components";
import { Devices, Home, Wiki } from './pages';
import './styles/style.scss';

function App() {
  return (
    <Router>
      <Home path="/" />
      <Devices path="/device" >
        <LatestRelease path="/" dummyCount={6} />
      </Devices>
      <Wiki path="/wiki" />
    </Router>
  );
}

export default App;
