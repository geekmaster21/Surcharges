import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Layout, MetaTagsDynamic, MetaTagsStatic } from 'components';
import config from 'config';
import cookie from 'cookie';
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

OrangeFoxApp.getInitialProps = async ({
  ctx,
  router,
  Component,
}: AppContextType) => {
  let headerAcl = '';
  let pageProps: any = {},
    translations: any = {},
    alpPicked = null;

  try {
    const cookieData = cookie.parse(ctx.req?.headers?.cookie || '');

    headerAcl = ctx.req?.headers?.['accept-language']!;
    if (!IsCSR) {
      console.log({ headerAcl });
    }
    if (headerAcl) {
      alpPicked = pick(langCodes, headerAcl);
    }

    const locale =
      cookieData[keyOfLang] ||
      alpPicked ||
      router.locale ||
      config.locale.default;

    if (ctx.res && ctx.req && locale !== router.locale) {
      ctx.res.writeHead(307, { Location: `/${locale}${ctx.req.url}` });
      return ctx.res.end();
    }

    translations = await import(`public/translations/${locale}.json`).then(x =>
      Dotize.convert(x.default || x)
    );

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps: {
        ...pageProps,
        locale,
        translations,
      },
    };
  } catch (err) {
    console.error(
      {
        headerAcl,
        errMsg: err.toString(),
        catchedError: 'some-error-occurred',
      },
      err
    );
  }
};
