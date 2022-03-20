import availableLanguages from '@public/translations/list.json';
import regions from '@public/translations/region.json';
import pkg from '@root/package.json';

export default {
  regions,
  availableLanguages,
  version: pkg.version,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  isDevEnv: process.env.NODE_ENV === 'development',
  locale: {
    default: 'en',
    current: 'en', // changes dynamically
    pattern: /^(([a-z]{2})|([a-z]{2}-[A-Za-z]{2,4}))$/, // pattern like "/en" OR "/en-US"
  },
};
