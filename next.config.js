const locales = require('./public/translations/list.json').map(m =>
  m.code.trim()
);

module.exports = {
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
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./sitemap.js');
    }
    return config;
  },
};
