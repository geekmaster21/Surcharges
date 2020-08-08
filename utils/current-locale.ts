import config from 'config';
import cookies from 'js-cookie';

const ofLang = 'of-lang';

export const SetCurrentLocale = (locale: string) => {
    config.currentLocale = locale;
    cookies.set(ofLang, locale);
}

export const GetCurrentLocale = (): string => {
    const value = cookies.get(ofLang);
    return String((value ? value : config.defaultLang) || 'en');
}
