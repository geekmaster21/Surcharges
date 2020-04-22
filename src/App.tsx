import React from 'react';
import { Router } from "@reach/router";
import { Header, Splash } from "./components";
import { Device, Home } from './pages';
import './styles/style.scss';

function App() {
  return (<>
    <Header showLogo />
    <Router>
      <Home path="/" >
        <Splash path="/" />
        <Device path="/d/:code" />
      </Home>
    </Router>
  </>);
}

export default App;
