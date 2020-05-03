function pe(key: string, noPrefix = false) {
    return process.env[noPrefix ? key : `REACT_APP_${key}`] || '';
}

export const APP_CONFIG = {
    apiUrl: pe('API_URL'),
    defaultLang: pe('DEFAULT_LANG'),
    showAds: pe('SHOW_ADS') === 'true',
    isDevEnv: pe('NODE_ENV', true) === 'DEVELOPMENT',
}
