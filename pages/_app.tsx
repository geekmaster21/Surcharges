import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { apiGetAllDeviceList } from "apis";
import { Footer, StaticMetaTags } from "components/common";
import { Drawer } from "components/home";
import config from "config";
import { ServerResponse } from "http";
import { IDevice } from "models";
import {
  AppContextType,
  AppPropsType,
  NextPageContext,
} from "next/dist/next-server/lib/utils";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import { IntlProvider } from "react-intl";
import useStyles from "styles/mui/app";
import { GetCurrentLocale, IsCSR, SetCurrentLocale } from "utils";
import { DarkTheme } from "../themes";

import "styles/app.scss";

export default function OrangeFoxApp(props: AppPropsType) {
  const classes = useStyles();
  const {
    Component,
    pageProps: { messages, deviceList, ...pageProps },
  } = props;

  React.useEffect(() => {
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

function redirect(locale: string, asPath: string, res?: ServerResponse) {
  const Location = `/${locale}${asPath}`;
  if (res) {
    res.writeHead(302, { Location });
    res.end();
    return true;
  } else {
    if (IsCSR) {
      Router.push(Location);
      return true;
    }
  }
  return false;
}

function RedirectIfNecessary({ asPath, res }: NextPageContext) {
  if (asPath) {
    const { availableLanguages, currentLocale, localePattern } = config;
    const reqLocale = (asPath || "").split("/").filter(Boolean).shift() || "";
    if (localePattern.test(reqLocale)) {
      // is like /en
      const localeExists = availableLanguages.some((s) => s.code === reqLocale);
      if (localeExists && reqLocale !== currentLocale) {
        SetCurrentLocale(reqLocale);
        return redirect(reqLocale, asPath, res);
      }
    } else {
      // is not like /en
      const curLocale = GetCurrentLocale();
      return redirect(curLocale, asPath, res);
    }
  }
  return false;
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
