import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Layout, MetaTagsDynamic, MetaTagsStatic } from 'components';
import config from 'config';
import cookie from 'cookie';
import type { AppProps } from 'next/app';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import 'styles/app.scss';
import { Dotize, IsCSR, keyOfLang } from 'utils';
import { pick } from 'utils/accept-language-parser';
import DisableErrorFromReactIntl from 'utils/react-intl';
import { DarkTheme } from '../themes';

// TODO: remove this and handle translations properly
DisableErrorFromReactIntl();

type PageProps = {
  locale: string;
  translations: Record<string, string>;
};

export default function OrangeFoxApp(props: AppProps<PageProps>) {
  const {
    Component,
    pageProps: { translations, locale, ...rest },
  } = props;

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
            <Component {...rest} />
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
  let alpPicked = null;
  let localeToUse = '';
  let headerLocale = '';
  let pageProps = {} as PageProps;

  try {
    if (IsCSR) {
      localeToUse = config.locale.current; // TODO: This should be router.locale, but it's not working properly
    } else {
      const cookieData = cookie.parse(ctx.req!.headers.cookie || '');

      headerLocale = ctx.req!.headers!['accept-language']!;

      if (headerLocale) {
        alpPicked = pick(langCodes, headerLocale);
      }

      localeToUse =
        cookieData[keyOfLang] ||
        alpPicked ||
        router.locale ||
        config.locale.default;

      if (ctx.res && ctx.req && localeToUse !== router.locale) {
        console.log({ redirectedLocale: localeToUse });
        ctx.res.writeHead(307, { Location: `/${localeToUse}${ctx.req.url}` });
        return ctx.res.end();
      }
    }

    let cachedTranslation = traslationCache[localeToUse];

    if (cachedTranslation) {
      console.log('using cached translation for locale:', localeToUse);
    } else {
      traslationCache[localeToUse] = await import(
        `@public/translations/${localeToUse}.json`
      ).then(x => {
        console.log({ currentLocale: localeToUse });
        const translation = Dotize.convert(x.default || x);
        return translation;
      });
      cachedTranslation = traslationCache[localeToUse];
      console.log('added translation to cache for locale:', localeToUse);
    }

    if (Component.getInitialProps) {
      pageProps = (await Component.getInitialProps(ctx)) as PageProps;
    }

    return {
      pageProps: {
        ...pageProps,
        locale: localeToUse,
        translations: cachedTranslation,
      },
    };
  } catch (err: any) {
    console.error(
      {
        headerLocale,
        currentLocale: localeToUse,
        errMsg: err.toString(),
      },
      err
    );
  }
};
