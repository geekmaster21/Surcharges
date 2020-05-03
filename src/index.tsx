import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { APP_CONFIG } from './app-config';
import { createMuiTheme, CssBaseline, ThemeProvider } from './components';
import { DarkTheme } from './themes';

const theme = createMuiTheme(DarkTheme);

function toggleGoogleAds() {
  if (!APP_CONFIG.showAds) {
    const adScript = document.getElementById('scr-google-ads');
    adScript &&
      document.head.removeChild(adScript);
  }
}

function RenderApp() {
  toggleGoogleAds();
  return (<>
    {/* <React.StrictMode> TODO: Remove this once Material React fixes "findDomNode" bug */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </>);
}

ReactDOM.render(<RenderApp />, document.getElementById('root'));
