import React from 'react';
import { Router } from "@reach/router";
import { Header, Splash } from "./components";
import { Device, DeviceDetail, Devices, Home } from './pages';
import './styles/style.scss';

function App() {
  return (<>
    <Header showLogo />
    <Router>
      <Home path="/" >
        <Splash path="/" />
        <Device path="/d/:code" />
      </Home>
      <Devices path="/old" >
        <Splash path="/" />
        <DeviceDetail path="/device/:code" />
      </Devices>
    </Router>
  </>);
}

export default App;
