import React from 'react';
import { Router, Redirect } from "@reach/router";
import { Footer, Header, Splash } from "./components";
import { Device, Home, NotFound, DirectBuild } from './pages';
import './styles/style.scss';

function App() {
  return (<>
    <Header showLogo />
    <Router style={{ height: '100%' }}>
      <Home path="/:lang">
        <Splash path="/" />
        <Device path="/device/:code" />
        <DirectBuild path="/build/:code/:type/:version" />
        <NotFound default />
      </Home>
      <Redirect from="/" to="/en" noThrow />
    </Router>
    <Footer />
  </>);
}

export default App;
