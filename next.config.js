// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const locales = require('./public/translations/list.json').map(
  m => m.code && m.code.trim()
);

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  async redirects() {
    return [
      {
        source: '/build/:code/:type/:version',
        destination: '/release/:code/:type/:version',
        permanent: true,
      },
    ];
  },
  i18n: {
    locales,
    defaultLocale: 'en',
    localeDetection: false,
  },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
