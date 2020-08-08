import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { apiGetAllDeviceList } from "apis";
import { Footer, StaticMetaTags } from "components/common";
import { Drawer } from "components/home";
import config from "config";
import { IDevice } from "models";
import { AppContextType, AppPropsType } from "next/dist/next-server/lib/utils";
import Head from "next/head";
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import "styles/app.scss";
import useStyles from "styles/mui/app";
import { RedirectIfNecessary } from "utils";
import { DarkTheme } from "../themes";

export default function OrangeFoxApp(props: AppPropsType) {
  const classes = useStyles();
  const {
    Component,
    pageProps: { messages, deviceList, origin, ...pageProps },
  } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>OrangeFox Recovery | Downloads</title>
        <StaticMetaTags />
      </Head>
      <ThemeProvider theme={DarkTheme}>
        <IntlProvider locale={config.currentLocale} messages={messages}>
          <CssBaseline />
          <div className={classes.root}>
            <Drawer list={deviceList} />
            <main className={classes.routeContent}>
              <Component {...pageProps} />
            </main>
          </div>
          <Footer />
        </IntlProvider>
      </ThemeProvider>
    </>
  );
}

OrangeFoxApp.getInitialProps = async ({ ctx, Component }: AppContextType) => {
  const isRedirected = RedirectIfNecessary(ctx);
  let pageProps: any = {},
    translations: any = {},
    deviceList: IDevice[] = [];
  const { currentLocale } = config;

  if (!isRedirected) {
    deviceList = await apiGetAllDeviceList();

    const transResults = await import(
      `public/translations/${currentLocale}.json`
    );
    translations = transResults.default;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
  }
  return {
    pageProps: {
      ...pageProps,
      deviceList,
      translations,
      locale: currentLocale,
    },
  };
};
