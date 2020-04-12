import React from 'react';
import { Router } from "@reach/router";
import { Header, Splash } from "./components";
import { Devices } from './pages';
import './styles/style.scss';

function App() {
  return (<>
    <Header showLogo />
    <Router>
      <Devices path="/" >
        <Splash path="/" />
      </Devices>
    </Router>
  </>);
}

export default App;
