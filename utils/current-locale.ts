import config from 'config';
import Cookies from 'universal-cookie';

const ofLang = 'of-lang';
const cookies = new Cookies();

export const SetCurrentLocale = (locale: string) => {
    config.currentLocale = locale;
    cookies.set(ofLang, locale);
}

export const GetCurrentLocale = (): string => {
    const value = cookies.get(ofLang);
    return String((value ? value : config.defaultLang) || 'en');
}
