const locales = require('./public/translations/list.json').map(m =>
  m.code.trim()
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
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     require('./scripts/sitemap.js');
  //   }
  //   return config;
  // },
  target: 'serverless',
};

const SentryWebpackPluginOptions = {
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
