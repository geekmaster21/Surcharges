import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from "react-intl";
import App from './App';
import { createMuiTheme, CssBaseline, ThemeProvider } from './components';
import { STORAGE } from './core';
import { DarkTheme } from './themes';

const theme = createMuiTheme(DarkTheme);
const lang = STORAGE.get<string>('lang');

ReactDOM.render(
  // <React.StrictMode> TODO: Remove this once Material React fixes "findDomNode" bug
  <ThemeProvider theme={theme}>
    <IntlProvider locale={lang || 'en'} >
      <CssBaseline />
      <App />
    </IntlProvider>
  </ThemeProvider>
  // </React.StrictMode>
  , document.getElementById('root')
);
