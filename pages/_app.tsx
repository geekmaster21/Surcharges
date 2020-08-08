import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { apiGetAllDeviceList } from "apis";
import { Footer, MetaTagsDynamic, MetaTagsStatic } from "components/common";
import { Drawer } from "components/home";
import config from "config";
import { IDevice } from "models";
import { AppContextType, AppPropsType } from "next/dist/next-server/lib/utils";
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import "styles/app.scss";
import useStyles from "styles/mui/app";
import { RedirectIfNecessary } from "utils";
import { DarkTheme } from "../themes";

const MetaDesc = [
  "OrangeFox Recovery is one of the most popular custom recoveries in android ecosystem,",
  " with amazing additional features that are not present in other recoveries. We support a host of devices",
].join("");

export default function OrangeFoxApp(props: AppPropsType) {
  const classes = useStyles();
  const {
    Component,
    pageProps: { messages, deviceList, origin, ...pageProps },
  } = props;

  const list = (deviceList || []) as IDevice[];

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  const itemListElement = list.map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      identifier: m.codename,
      name: `Orangefox recovery for ${m.fullname} (${m.codename})`,
      operatingSystem: "Android",
      applicationCategory: "SoftwareApplication",
      applicationSubCategory: "CustomRecovery",
      url: `/device/${m.codename}`,
      downloadUrl: `/device/${m.codename}`,
      accessMode: "visual",
      offers: {
        "@type": "Offer",
        price: "0.00",
        priceCurrency: "XXX",
        availability: `https://schema.org/InStock`,
      },
    },
  }));

  return (
    <>
      <MetaTagsStatic />
      <MetaTagsDynamic
        desc={MetaDesc}
        jsonLd={{
          "@type": "ItemList",
          name: "Supported Devices",
          itemListElement,
        }}
      />
      <ThemeProvider theme={DarkTheme}>
        <IntlProvider locale={config.currentLocale} messages={messages}>
          <CssBaseline />
          <div className={classes.root}>
            <Drawer list={list} />
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
    console.log(translations);

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
