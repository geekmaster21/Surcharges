import React from 'react';
import { Redirect, Router } from "@reach/router";
import { Splash } from "./components";
import { STORAGE } from './core';
import { Device, DirectBuild, Home, NotFound } from './pages';
import './styles/style.scss';

function App() {
  const locale = STORAGE.get<string>('lang') || 'en';
  return (<>
    <div></div>
    <Router style={{ height: '100%' }} >
      <Home path="/:lang">
        <Splash path="/" />
        <Device path="/device/:code" />
        <DirectBuild path="/build/:code/:type/:version" />
        <NotFound default />
      </Home>
      <Redirect from="/" to={`/${locale}`} noThrow />
    </Router>
  </>);
}

export default App;
