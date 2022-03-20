import Head from 'next/head';
import { DarkTheme } from 'themes';

export const MetaTagsStatic = () => (
  <Head>
    <title>OrangeFox Recovery</title>
    <meta charSet='utf-8' />

    <meta name='theme-color' content={DarkTheme.palette.primary.main} />
    <link rel='icon' href='/icons/favicon.ico' />
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    />
    <meta name='description' content='OrangeFox Recovery | Downloads' />

    <meta name='robots' content='index,follow' />
    <meta name='googlebot' content='index,follow' />

    <meta name='msapplication-TileColor' content='#000000' />
    <meta name='msapplication-TileImage' content='/icons/ms-icon-144x144.png' />

    <link
      rel='apple-touch-icon'
      sizes='57x57'
      href='/icons/apple-icon-57x57.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='60x60'
      href='/icons/apple-icon-60x60.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='72x72'
      href='/icons/apple-icon-72x72.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='76x76'
      href='/icons/apple-icon-76x76.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='114x114'
      href='/icons/apple-icon-114x114.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='120x120'
      href='/icons/apple-icon-120x120.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='144x144'
      href='/icons/apple-icon-144x144.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='152x152'
      href='/icons/apple-icon-152x152.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='180x180'
      href='/icons/apple-icon-180x180.png'
    />

    <link
      rel='icon'
      type='image/png'
      sizes='16x16'
      href='/icons/favicon-16x16.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='16x16'
      href='/icons/favicon-16x16.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='96x96'
      href='/icons/favicon-96x96.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='32x32'
      href='/icons/favicon-32x32.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='192x192'
      href='/icons/android-icon-192x192.png'
    />
    <link rel='manifest' href='/manifest.json' />
    {/* <script
      type='text/javascript'
      dangerouslySetInnerHTML={{
        __html: `
        var _jipt = [];
        _jipt.push(['project', '460e05451711eade718739973a0a58e6']);
        _jipt.push(['domain', 'orangefox']);
    `,
      }}
    />
    <script type='text/javascript' src='//cdn.crowdin.com/jipt/jipt.js' /> */}
  </Head>
);
