import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { apiGetAllDeviceList } from 'apis';
import { Layout, MetaTagsDynamic, MetaTagsStatic } from 'components';
import config from 'config';
import cookie from 'cookie';
import { useIsMounted } from 'hooks/mount';
import { IDevice } from 'models';
import { AppContextType, AppPropsType } from 'next/dist/next-server/lib/utils';
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import 'styles/app.scss';
import { Dotize, keyOfLang } from 'utils';
import { pick } from 'utils/accept-language-parser';
import DisableErrorFromReactIntl from 'utils/react-intl';
import { DarkTheme } from '../themes';

const metaDesc = [
  'OrangeFox Recovery is one of the most popular custom recoveries in android ecosystem,',
  ' with amazing additional features that are not present in other recoveries. We support a host of devices',
].join('');

// TODO: remove this and handle translations properly
DisableErrorFromReactIntl();

export default function OrangeFoxApp(props: AppPropsType) {
  const {
    Component,
    pageProps: { translations, deviceList, locale, ...rest },
  } = props;

  const isMounted = useIsMounted();
  const [list, setList] = useState((deviceList || []) as IDevice[]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
    if (isMounted) {
      apiGetAllDeviceList().then(x => isMounted && setList(x));
    }
  }, []);

  const itemListElement = list.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareApplication',
      identifier: m.codename,
      name: `Orangefox recovery for ${m.fullname} (${m.codename})`,
      operatingSystem: 'Android',
      applicationCategory: 'SoftwareApplication',
      applicationSubCategory: 'CustomRecovery',
      url: `/device/${m.codename}`,
      downloadUrl: `/device/${m.codename}`,
      accessMode: 'visual',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'XXX',
        availability: `https://schema.org/InStock`,
      },
    },
  }));

  return (
    <>
      <MetaTagsStatic />
      <MetaTagsDynamic
        desc={metaDesc}
        jsonLd={{
          '@type': 'ItemList',
          name: 'Supported Devices',
          itemListElement,
        }}
      />
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        <IntlProvider locale={locale} messages={translations}>
          <Layout list={list}>
            <Component {...{ deviceList, ...rest }} />
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
    console.log({ headerAcl });
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
        catchedError: 'some-error-occurred',
        headerAcl,
        errMsg: err.toString(),
      },
      err
    );
  }
};
