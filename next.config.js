const locales = require('./public/translations/list.json').map(m =>
  m.code.trim()
);

/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
