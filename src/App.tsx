import React from 'react';
import { navigate, Redirect, Router } from "@reach/router";
import { Splash } from "./components";
import { STORAGE } from './core';
import { Device, DirectBuild, Home, NotFound } from './pages';
import './styles/style.scss';

function App() {
  const { pathname } = window.location;
  const locale = STORAGE.get<string>('lang') || 'en';
  const langReg = /^(([a-z]{2})|([a-z]{2}-[A-Z]{2}))$/; // tests "/en" OR "en-US" lang format in url
  const pathLang = (pathname || '').split('/').filter(Boolean).shift() || '';

  if (!langReg.test(pathLang)) {
    navigate(`/${locale}${pathname}`);
  }

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
