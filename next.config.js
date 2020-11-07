const locales = require('./public/translations/list.json').map(m =>
  m.code.trim()
);

module.exports = {
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
