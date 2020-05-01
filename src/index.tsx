import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, CssBaseline, ThemeProvider } from './components';
import { DarkTheme } from './themes';

const theme = createMuiTheme(DarkTheme);

function ConfigureGoogleAds() {
  ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({
    google_ad_client: "ca-pub-5046421731649433",
    enable_page_level_ads: true
  });
}

function RenderApp() {
  ConfigureGoogleAds();
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
