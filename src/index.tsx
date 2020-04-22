import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, CssBaseline, ThemeProvider } from './components';
import { DarkTheme } from './themes';

const theme = createMuiTheme(DarkTheme);

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
  // </React.StrictMode>
  , document.getElementById('root')
);
