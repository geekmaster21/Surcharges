import React from 'react';
import { Router } from "@reach/router";
import { Footer, Header, Splash } from "./components";
import { Device, Home } from './pages';
import './styles/style.scss';

function App() {
  return (<>
    <Header showLogo />
    <Router style={{ height: '100%' }}>
      <Home path="/">
        <Splash path="/" />
        <Device path="/d/:code" />
      </Home>
    </Router>
    <Footer />
  </>);
}

export default App;
