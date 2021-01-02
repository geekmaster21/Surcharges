import availableLanguages from 'public/translations/list.json';
import { version } from './package.json';

export default {
  version,
  apiUrl: 'https://api.orangefox.download/v3',
  isDevEnv: process.env.NODE_ENV === 'development',
  availableLanguages,
  locale: {
    default: 'en',
    current: 'en', // changes dynamically
    pattern: /^(([a-z]{2})|([a-z]{2}-[A-Za-z]{2,4}))$/, // pattern like "/en" OR "/en-US"
  },
};
