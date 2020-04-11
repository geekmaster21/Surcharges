import { Router } from "@reach/router";
import React from 'react';
import { Home } from './pages';
import './styles/style.scss';

function App() {
  return (
    <Router>
      <Home path="/" />
    </Router>
  );
}

export default App;
