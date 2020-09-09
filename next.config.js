module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./sitemap.js');
    }
    return config;
  },
};
