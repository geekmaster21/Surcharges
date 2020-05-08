import { version } from '../package.json';

function pe(key: string, noPrefix = false) {
    return process.env[noPrefix ? key : `REACT_APP_${key}`] || '';
}

export const APP_CONFIG = {
    version,
    apiUrl: pe('API_URL'),
    defaultLang: pe('DEFAULT_LANG'),
    isDevEnv: pe('NODE_ENV', true).toLowerCase() === 'development',
}
