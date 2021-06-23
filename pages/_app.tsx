import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Layout, MetaTagsDynamic, MetaTagsStatic } from 'components';
import config from 'config';
import cookie from 'cookie';
import { AppContextType, AppPropsType } from 'next/dist/next-server/lib/utils';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import 'styles/app.scss';
import { CooKEY, Dotize, IsCSR } from 'utils';
import { pick } from 'utils/accept-language-parser';
import DisableErrorFromReactIntl from 'utils/react-intl';
import sentry from 'utils/sentry';
import { DarkTheme } from '../themes';

// TODO: remove this and handle translations properly
DisableErrorFromReactIntl();

export default function OrangeFoxApp(props: AppPropsType) {
  const {
    Component,
    pageProps: { translations, _locale, ...rest },
    err,
  } = props as any;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement?.contains(jssStyles)) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <MetaTagsStatic />
      <MetaTagsDynamic
        desc={[
          'OrangeFox Recovery is one of the most popular custom recoveries in android ecosystem',
          ' with amazing additional features that are not present in other recoveries. We support a host of devices',
        ].join()}
      />
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        <IntlProvider locale={_locale} messages={translations}>
          <Layout>
            <Component {...rest} err={err} />
          </Layout>
        </IntlProvider>
      </ThemeProvider>
    </>
  );
}

const langCodes = config.availableLanguages.map(m => m.code);

const traslationCache: { [p: string]: any } = {};

OrangeFoxApp.getInitialProps = async ({
  ctx,
  router,
  Component,
}: AppContextType) => {
  let _locale = '',
    headerLocale,
    routerLocale,
    alpPicked = null,
    pageProps: any = {},
    cookieData: any = {};

  try {
    routerLocale = router?.locale;
    cookieData = cookie.parse(ctx.req?.headers?.cookie || '');
    headerLocale = ctx.req?.headers?.['accept-language']!;

    if (!IsCSR) {
      console.log({ headerLocale });
    }
    if (headerLocale) {
      alpPicked = pick(langCodes, headerLocale);
    }

    _locale =
      cookieData[CooKEY] || alpPicked || routerLocale || config.locale.default;

    if (ctx.res && ctx.req && _locale !== routerLocale) {
      console.log({ redirectedLocale: _locale });
      sentry.error({
        __source__: '_app (before redirect)',
        headerLocale,
        routerLocale,
        cookies: cookieData,
        redirectedLocale: _locale,
      });
      ctx.res.writeHead(307, { Location: `/${_locale}${ctx.req.url}` });
      return ctx.res.end();
    }

    let cachedTranslation = traslationCache[_locale];

    if (cachedTranslation) {
      console.log('using cached translation for _locale:', _locale);
    } else {
      traslationCache[_locale] = await import(
        `public/translations/${_locale}.json`
      ).then(x => {
        console.log({ currentLocale: _locale });
        const translation = Dotize.convert(x.default || x);
        return translation;
      });
      cachedTranslation = traslationCache[_locale];
      console.log('added translation to cache for _locale:', _locale);
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps: {
        ...pageProps,
        _locale,
        translations: cachedTranslation,
      },
    };
  } catch (err) {
    sentry.error({
      __source__: '_app',
      headerLocale,
      routerLocale,
      currentLocale: _locale,
      cookies: cookieData,
      errMsg: err.toString(),
      ...err,
    });
  }
};
