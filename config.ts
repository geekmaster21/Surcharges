import data from "public/translations/translations.json";
import { version } from './package.json';

export default {
    version,
    defaultLang: 'en',
    availableLanguages: data,
    currentLanguage: '', // set dynamically
    apiUrl: 'https://api.orangefox.download/v2',
    isDevEnv: process.env.NODE_ENV === 'development',
    // assetPath: '', // Populated from _document.tsx (getInitialProps)
}
