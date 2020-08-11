import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { apiGetAllDeviceList } from "apis";
import { Layout, MetaTagsDynamic, MetaTagsStatic } from "components";
import config from "config";
import cookie from "cookie";
import { IDevice } from "models";
import { AppContextType, AppPropsType } from "next/dist/next-server/lib/utils";
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import {
  Dotize,
  keyOfLang,
  RedirectOnMissingLocale,
  SetCurrentLocale,
} from "utils";
import { DarkTheme } from "../themes";

import "styles/app.scss";

const MetaDesc = [
  "OrangeFox Recovery is one of the most popular custom recoveries in android ecosystem,",
  " with amazing additional features that are not present in other recoveries. We support a host of devices",
].join("");

export default function OrangeFoxApp(props: AppPropsType) {
  const {
    Component,
    pageProps: { translations, deviceList, locale, ...rest },
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
        <IntlProvider locale={locale} messages={translations}>
          <CssBaseline />
          <Layout list={list}>
            <Component {...{ deviceList, ...rest }} />
          </Layout>
        </IntlProvider>
      </ThemeProvider>
    </>
  );
}

const appCache: {
  deviceList: IDevice[];
  [currentLocale: string]: any; // Translation for current locale
} = { deviceList: [] };

OrangeFoxApp.getInitialProps = async ({ ctx, Component }: AppContextType) => {
  let pageProps: any = {};
  const cookieData = cookie.parse(ctx.req?.headers.cookie || "");
  const locale = cookieData[keyOfLang] || config.locale.current;
  const isRedirected = RedirectOnMissingLocale(ctx, locale);

  if (!isRedirected) {
    SetCurrentLocale(locale);

    if (!appCache.deviceList.length) {
      appCache.deviceList = await apiGetAllDeviceList();
    }

    if (!appCache[locale]) {
      await import(`public/translations/${locale}.json`).then((x) => {
        appCache[locale] = Dotize.convert(x.default || x);
      });
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
  }

  return {
    pageProps: {
      ...pageProps,
      locale,
      deviceList: appCache.deviceList,
      translations: appCache[locale],
    },
  };
};
