import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import { DarkTheme } from './themes';

const theme = createMuiTheme(DarkTheme);

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}><App /></ThemeProvider>
  // </React.StrictMode>
  , document.getElementById('root')
);
