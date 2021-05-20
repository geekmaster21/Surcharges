import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Sentry from '@sentry/nextjs';
import { Layout, MetaTagsDynamic, MetaTagsStatic } from 'components';
import config from 'config';
import cookie from 'cookie';
import { locale } from 'dayjs';
import { AppContextType, AppPropsType } from 'next/dist/next-server/lib/utils';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import 'styles/app.scss';
import { Dotize, IsCSR, keyOfLang } from 'utils';
import { pick } from 'utils/accept-language-parser';
import DisableErrorFromReactIntl from 'utils/react-intl';
import { DarkTheme } from '../themes';

// TODO: remove this and handle translations properly
DisableErrorFromReactIntl();

export default function OrangeFoxApp(props: AppPropsType) {
  const {
    Component,
    pageProps: { translations, locale, ...rest },
    err,
  } = props as any;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
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
        <IntlProvider locale={locale} messages={translations}>
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
  let headerLocale = '';
  let pageProps: any = {},
    alpPicked = null;

  try {
    const cookieData = cookie.parse(ctx.req?.headers?.cookie || '');

    headerLocale = ctx.req?.headers?.['accept-language']!;
    if (!IsCSR) {
      console.log({ headerLocale });
    }
    if (headerLocale) {
      alpPicked = pick(langCodes, headerLocale);
    }

    const locale =
      cookieData[keyOfLang] ||
      alpPicked ||
      router.locale ||
      config.locale.default;

    if (ctx.res && ctx.req && locale !== router.locale) {
      console.log({ redirectedLocale: locale });
      ctx.res.writeHead(307, { Location: `/${locale}${ctx.req.url}` });
      return ctx.res.end();
    }

    let cachedTranslation = traslationCache[locale];

    if (cachedTranslation) {
      console.log('using cached translation for locale:', locale);
    } else {
      traslationCache[locale] = await import(
        `public/translations/${locale}.json`
      ).then(x => {
        console.log({ currentLocale: locale });
        const translation = Dotize.convert(x.default || x);
        return translation;
      });
      cachedTranslation = traslationCache[locale];
      console.log('added translation to cache for locale:', locale);
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps: {
        ...pageProps,
        locale,
        translations: cachedTranslation,
      },
    };
  } catch (err) {
    Sentry.captureException({
      __source__: '_app',
      headerLocale,
      currentLocale: locale,
      errMsg: err.toString(),
    });
    await Sentry.flush(2000);
    console.error(
      {
        headerLocale,
        currentLocale: locale,
        errMsg: err.toString(),
        catchedError: 'some-error-occurred',
      },
      err
    );
  }
};
