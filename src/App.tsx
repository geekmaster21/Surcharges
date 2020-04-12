import React from 'react';
import { Router } from "@reach/router";
import { Header, Splash } from "./components";
import { DeviceDetail, Devices } from './pages';
import './styles/style.scss';

function App() {
  return (<>
    <Header showLogo />
    <Router>
      <Devices path="/" >
        <Splash path="/" />
        <DeviceDetail path="/device/:code" />
      </Devices>
    </Router>
  </>);
}

export default App;
